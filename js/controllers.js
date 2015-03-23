'use strict';

angular.module('app.controllers', ['ngCookies'])
    .controller('AppCtrl', ['$scope', '$localStorage', function ($scope, $localStorage) {
        var isTouchDevice = !!('ontouchstart' in window);
        var isIE = !!navigator.userAgent.match(/MSIE/i);
        !isTouchDevice && $('html').addClass('no-touch');
        isIE && $('html').addClass('ie');
        $scope.app = {
            name: 'Typiak',
            version: '1.0.0',
            color: {
                primary: '#7266ba',
                info: '#23b7e5',
                success: '#27c24c',
                warning: '#fad733',
                danger: '#f05050',
                light: '#e8eff0',
                dark: '#2c3e50',
                black: '#1c2b36'
            },
            settings: {
                themeID: 1,
                navbarHeaderColor: 'bg-dark',
                navbarCollapseColor: 'bg-dark',
                asideColor: 'bg-black',
                headerFixed: true,
                asideFixed: true,
                asideFolded: false,
                nativeFirstColor: 'danger',
                nativeSecondColor: 'dark'
            }
        };
        $localStorage.settings = $scope.app.settings;
        $scope.$watch('app.settings', function () {
            $localStorage.settings = $scope.app.settings;
        }, true);
    }])

    .controller('AppController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
        $scope.panier = [];
        $http({method: 'GET', url: 'api/currentUser'})
            .success(function(data){
                if (data) {
                    $scope.user  = [];
                    $scope.menus = [];
                    $scope.user['email']    = data[0]['email'];
                    $scope.user['id']       = data[0]['id'];
                    $scope.user['level']    = data[0]['level'];
                    $scope.user['name']     = data[0]['name'];

                    $http({method: 'GET', url: 'api/panier'})
                        .success(function(dataPanier) {
                            $scope.panier = dataPanier;
                            $scope.panierLength = $scope.panier.length;
                        });

                    $http({method: 'GET', url: 'api/menus/' + $scope.user['level']})
                        .success(function(data){
                            $scope.menus = data;
                        });
                } else {
                    $location.path('access/signin');
                }
            });

        $scope.deconnexion = function() {
            $http({method: 'GET', url: 'api/decoUser'})
        };
    }])

    .controller('DashboardController', ['$scope', '$http', function ($scope, $http) {
        $http({method: 'GET', url: 'api/currentUser'})
            .success(function(data) {
                if (data) {
                    $scope.userID = data[0]['id'];
                    $http({method: 'GET', url: 'api/locations/' + $scope.userID})
                        .success(function(data) {
                            $scope.nbLocationsUser = data.length;
                        });
                }
            });

        $http({method: 'GET', url: 'api/users'})
            .success(function(data) {
                $scope.nbUsers = data.length;
            });

        $http({method: 'GET', url: 'api/locations'})
            .success(function(data) {
                $scope.nbLocations = data.length;
            });

        $http({method: 'GET', url: 'api/rooms'})
            .success(function(data) {
                $scope.nbRooms = data.length;
            });

        $http({method: 'GET', url: 'api/materials'})
            .success(function(data) {
                $scope.nbMaterials = data.length;
            });


    }])

    .controller('UsersController', ['$scope', '$http', '$modal', '$log', function ($scope, $http, $modal) {
        $http({method: 'GET', url: 'api/users'})
            .success(function(data) {
                $scope.users = data;
            });

        var ModalInstanceCtrl = function ($scope, $modalInstance, user, users) {
            $scope.deleteUser = function (user) {
                $http({method: 'GET', url: 'api/users/delete/' + user.id})
                angular.forEach(users, function(value, key) {
                    if (user.id == value.id) {
                        users.splice(key, 1);
                    }
                });
            };

            $scope.ok = function () {
                console.log(user);
                $modalInstance.close();
                $scope.deleteUser(user);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };

        $scope.open = function (size, user) {
            $scope.userDelete = user;
            var modalInstance = $modal.open({
                templateUrl: 'modal_confirmation_delete_user.html',
                controller: ModalInstanceCtrl,
                size: size,
                resolve: {
                    user: function() {
                        return $scope.userDelete;
                    },
                    users: function() {
                        return $scope.users;
                    }
                }
            });
        };
    }])

    .controller('SallesController', ['$scope', '$http', '$modal', function ($scope, $http, $modal) {
        $http({method: 'GET', url: 'api/notlocation/rooms'})
            .success(function(dataRooms) {
                $scope.rooms = dataRooms;
                $http({method: 'GET', url: 'api/panier'})
                    .success(function(dataPanier) {
                        (dataPanier) ? $scope.panier = dataPanier : $scope.panier = [];
                        $scope.$parent.panierLength = $scope.panier.length;
                        angular.forEach(dataRooms, function(value, key) {
                            angular.forEach(dataPanier, function(v, k) {
                                if (value.id == v.id && value.type == v.type) {
                                    $scope.rooms[key]['panier'] =  true;
                                }
                            });
                        });
                    });
            });

        $scope.deletePanier = function(item) {
            $http({method: 'GET', url: 'api/panier/delete/' + item.id});
            angular.forEach($scope.rooms, function(value, key) {
                if (value.id == item.id) {
                    $scope.rooms[key]['panier'] = false;
                }
            });
            angular.forEach($scope.panier, function(value, key) {
                if (value.id == item.id && value.type == item.type) {
                    $scope.panier.splice(key, 1);
                }
            });
            $scope.$parent.panierLength = $scope.panier.length;
        };

        var ModalInstanceCtrl = function ($scope, $modalInstance, room, $filter, scope) {
            $scope.addPanier = function(dateBegin, dateBack) {
                angular.forEach(scope.rooms, function(value, key) {
                    if (room.id == value.id) {
                        scope.rooms[key]['panier']    = true;
                    }
                });
                room['date_begin'] = $filter('date')(dateBegin, 'yyyy-MM-dd');
                room['date_back']  = $filter('date')(dateBack, 'yyyy-MM-dd');
                room['quantity']  = 1;
                scope.panier.push(room);
                $http({method: 'GET', url: 'api/panier/' + JSON.stringify(room)});
                scope.$parent.panierLength = scope.panier.length;
            };

            $scope.ok = function () {
                $modalInstance.close();
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            $scope.minDate      = new Date();
            $scope.dateBegin    = $scope.minDate;
            $scope.dateBack     = $scope.dateBegin;
        };

        $scope.open = function (size, room) {
            var modalInstance = $modal.open({
                templateUrl: 'modal_add_room.html',
                controller: ModalInstanceCtrl,
                size: size,
                resolve: {
                    room: function() {
                        return room;
                    },
                    scope: function() {
                        return $scope;
                    }
                }
            });
        };
    }])

    .controller('MaterielsController', ['$scope', '$http', '$modal', function ($scope, $http, $modal) {
        $http({method: 'GET', url: 'api/notlocation/materials'})
            .success(function(dataMaterials) {
                $scope.materials = dataMaterials;
                $http({method: 'GET', url: 'api/panier'})
                    .success(function(dataPanier) {
                        (dataPanier) ? $scope.panier = dataPanier : $scope.panier = [];
                        $scope.$parent.panierLength = $scope.panier.length;
                        angular.forEach(dataMaterials, function(value, key) {
                            angular.forEach(dataPanier, function(v, k) {
                                if (value.id == v.id && value.type == v.type) {
                                    $scope.materials[key]['panier'] = true;
                                }
                            });
                        });
                    });
            });

        $scope.deletePanier = function(item) {
            $http({method: 'GET', url: 'api/panier/delete/' + item.id});
            angular.forEach($scope.materials, function(value, key) {
                if (value.id == item.id) {
                    $scope.materials[key]['panier'] = false;
                }
            });
            angular.forEach($scope.panier, function(value, key) {
                if (value.id == item.id && value.type == item.type) {
                    $scope.panier.splice(key, 1);
                }
            });
            $scope.$parent.panierLength = $scope.panier.length;
        };

        var ModalInstanceCtrl = function ($scope, $modalInstance, material, $filter, scope) {
            $scope.material         = material;
            $scope.quantityCommande = 1;

            $scope.addPanier = function(dateBegin, dateBack, quantity) {
                angular.forEach(scope.materials, function(value, key) {
                    if (material.id == value.id) {
                        scope.materials[key]['panier'] = true;
                    }
                });

                if (quantity > material.quantity_restante) {
                    material['date_begin'] = $filter('date')(dateBegin, 'yyyy-MM-dd');
                    material['date_back']  = $filter('date')(dateBack, 'yyyy-MM-dd');
                    material['quantity']  = material.quantity_restante;
                    scope.panier.push(material);
                } else if (quantity < 1) {
                    material['date_begin'] = $filter('date')(dateBegin, 'yyyy-MM-dd');
                    material['date_back']  = $filter('date')(dateBack, 'yyyy-MM-dd');
                    material['quantity']  = 1;
                    scope.panier.push(material);
                } else {
                    material['date_begin'] = $filter('date')(dateBegin, 'yyyy-MM-dd');
                    material['date_back']  = $filter('date')(dateBack, 'yyyy-MM-dd');
                    material['quantity']  = quantity;
                    scope.panier.push(material);
                }

                $http({method: 'GET', url: 'api/panier/' + JSON.stringify(material)});
                scope.$parent.panierLength = scope.panier.length;
            };

            $scope.ok = function () {
                $modalInstance.close();
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            $scope.minDate      = new Date();
            $scope.dateBegin    = $scope.minDate;
            $scope.dateBack     = $scope.dateBegin;
        };

        $scope.open = function (size, material) {
            var modalInstance = $modal.open({
                templateUrl: 'modal_add_material.html',
                controller: ModalInstanceCtrl,
                size: size,
                resolve: {
                    material: function() {
                        return material;
                    },
                    scope: function() {
                        return $scope;
                    }
                }
            });
        };
    }])

    .controller('PanierController', ['$scope', '$http', '$location', '$timeout', function ($scope, $http, $location, $timeout) {
        $scope.commandeSuccess = false;
        $scope.btnValider      = 'Valider la réservation';

        $http({method: 'GET', url: 'api/panier'})
            .success(function(data) {
                $scope.panier = data;
                $scope.$parent.panierLength = $scope.panier.length;
            });

        $scope.deletePanier = function(item) {
            $http({method: 'GET', url: 'api/panier/delete/' + item.id});
            angular.forEach($scope.panier, function(value, key) {
                if (value.id == item.id) {
                    $scope.panier.splice(key, 1);
                    $scope.$parent.panierLength = $scope.panier.length;
                }
            });
        };

        $scope.valideCommande = function() {
            $scope.btnValider = 'Réservation en cours &nbsp;&nbsp;<span class="fa fa-spinner fa-spin"></span>';
            angular.forEach($scope.panier, function(value, key) {
                $scope.panier[key]['user_id']  = $scope.$parent.user.id;
                $scope.panier[key]['ref_id']   = value.id;
                $scope.panier[key]['type_loc'] = value.type;
                $scope.panier[key]['state']    = 'BON';
                $http({method: 'GET', url: 'api/locations/add/' + JSON.stringify($scope.panier[key])});
            });
            $scope.commandeSuccess = true;
            $timeout(function() {
                $http({method: 'GET', url: 'api/commande/clear'});
                $scope.$parent.panierLength = 0;
                $location.path('app/dashboard');
            }, 2000);
        }
    }])

    .controller('InfosUserController', ['$scope', '$http', '$stateParams', function ($scope, $http, $stateParams) {
        $scope.userModify   = [];
        $scope.levels       = [];
        $scope.isModifiable = false;

        $http({method: 'GET', url: 'api/levels'})
            .success(function(data) {
                $scope.levels = data;
            });

        $http({method: 'GET', url: 'api/users/' + $stateParams.id})
            .success(function(data) {
                $scope.userModify = data[0];
            });

        $scope.modifierInfos    = function () {
            $http({method: 'GET', url: 'api/users/' + $stateParams.id})
                .success(function(data) {
                    $scope.userModify = data[0];

                    if ($scope.isModifiable == false) {
                        $scope.isModifiable = true;
                    } else {
                        $scope.isModifiable = false;
                    }
                });
        };

        $scope.modifierUser = function() {
            if ($scope.userModify) {
                $scope.showSuccess  = true;
                $scope.isModifiable = false;
                $http({method: 'GET', url: 'api/users/modify/' + $stateParams.id + '/' + JSON.stringify($scope.userModify)});
                $http({method: 'GET', url: 'api/users/' + $stateParams.id})
                    .success(function (data) {
                        $scope.userModify = data[0];
                    });
            }
        };
    }])

    .controller('NewUserController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
        $scope.addUser = function(user) {
            if (user) {
                $http({method: 'GET', url: 'api/users/new/' + JSON.stringify(user)});
                $location.path('app/dashboard');
            }
        };
    }])

    .controller('AgendaController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
        $scope.events = [];

        $http({method: 'GET', url: 'api/currentUser'})
            .success(function(data) {
                if (data) {
                    $scope.user          = [];
                    $scope.user['email'] = data[0]['email'];
                    $scope.user['id']    = data[0]['id'];
                    $scope.user['level'] = data[0]['level'];
                    $scope.user['name']  = data[0]['name'];

                    if ($scope.user.level == 2) {
                        $http({method: 'GET', url: 'api/locations/' + $scope.user.id})
                            .success(function(data) {
                                angular.forEach(data, function(value, key) {
                                    $scope.events.push({
                                        title: value.name,
                                        start: value.date_begin,
                                        end: value.date_back,
                                        className: (value.type_loc == 'RO') ? ['bg-primary bg'] : ['text-white bg-dark bg'] ,
                                        info: "Location " + ((value.type_loc == 'RO') ? "de la salle '" : "de " + value.quantity + " materiel(s) '") + value.name + "' du " + value.date_begin + " au " + value.date_back
                                    });
                                });

                            });
                    } else {
                        $http({method: 'GET', url: 'api/locations'})
                            .success(function(data) {
                                console.log(data);
                                angular.forEach(data, function(value, key) {
                                    console.log(key, value);
                                    $scope.events.push({
                                        title: value.name,
                                        start: value.date_begin,
                                        end: value.date_back,
                                        className: (value.type_loc == 'RO') ? ['bg-primary bg'] : ['text-white bg-dark bg'] ,
                                        info: "Location " + ((value.type_loc == 'RO') ? "de la salle '" : "de " + value.quantity + " materiel(s) '") + value.name + "' du " + value.date_begin + " au " + value.date_back
                                    });
                                });

                            });
                    }
                }
            });

        $scope.alertOnEventClick = function(event, jsEvent, view ){
            // ....
        };
        $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
            $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
        };
        $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view){
            $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
        };
        $scope.overlay = $('.fc-overlay');
        $scope.alertOnMouseOver = function( event, jsEvent, view ){
            $scope.event = event;
            $scope.overlay.removeClass('left right').find('.arrow').removeClass('left right top pull-up');
            var wrap = $(jsEvent.target).closest('.fc-event');
            var cal = wrap.closest('.calendar');
            var left = wrap.offset().left - cal.offset().left;
            var right = cal.width() - (wrap.offset().left - cal.offset().left + wrap.width());
            if( right > $scope.overlay.width() ) {
                $scope.overlay.addClass('left').find('.arrow').addClass('left pull-up')
            }else if ( left > $scope.overlay.width() ) {
                $scope.overlay.addClass('right').find('.arrow').addClass('right pull-up');
            }else{
                $scope.overlay.find('.arrow').addClass('top');
            }
            (wrap.find('.fc-overlay').length == 0) && wrap.append( $scope.overlay );
        };

        $scope.uiConfig = {
            calendar:{
                height: 450,
                editable: false,
                header:{
                    left: 'prev',
                    center: 'title',
                    right: 'next'
                },
                eventClick: $scope.alertOnEventClick,
                //eventDrop: $scope.alertOnDrop,
                //eventResize: $scope.alertOnResize,
                eventMouseover: $scope.alertOnMouseOver,
                dayNames : ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
                dayNamesShort : ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
                monthNames : ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"],
                monthNamesShort : ["Janv", "Févr", "Mars", "Avri", "Mai", "Juin", "Juil", "Aout", "Sept", "Oct", "Nov", "Déc"]
            }
        };

        $scope.remove = function(index) {
            $scope.events.splice(index,1);
        };

        $scope.changeView = function(view, calendar) {
            calendar.fullCalendar('changeView', view);
        };

        $scope.today = function(calendar) {
            calendar.fullCalendar('today');
        };

        $scope.renderCalender = function(calendar) {
            if(calendar){
                calendar.fullCalendar('render');
            }
        };

        $scope.eventSources = [$scope.events];
    }])

    .controller('SigninController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
        $scope.btnConnect = "<span>Se connecter</span>";
        $scope.errorSignin  = '';
        $scope.submit = function() {
            $scope.btnConnect = "<span class='fa fa-spinner fa-spin'></span>";
            $http({method: 'GET', url: 'api/users/' + $scope.user.email + '/' + $scope.user.password})
                .success(function(data){
                    if (data) {
                        $location.path('app/dashboard');
                        $scope.btnConnect = "<span>Se connecter</span>";
                    } else {
                        $scope.errorSignin  = 'Email ou mot de passe incorrecte';
                        $scope.btnConnect = "<span>Se connecter</span>";
                    }
                });
        }
    }]);