'use strict';

angular.module('app.controllers', ['ngCookies'])
    .controller('AppCtrl', ['$scope', '$localStorage', '$location', '$timeout', '$sce', function ($scope, $localStorage, $location, $timeout, $sce) {
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

        $scope.btnConnect = "<span>Se connecter</span>";

        var rootRef = new Firebase('https://typiak-m2l.firebaseio.com/');
        if (rootRef.getAuth()) {
            console.log('connecté');
            rootRef.child('users').child(rootRef.getAuth().uid).on('value' ,function(dataSnapshot) {
                var user = dataSnapshot.val();
                $timeout(function() {
                    $scope.user = {
                        'uid' : rootRef.getAuth().uid,
                        'level' : user.level,
                        'name' : user.name,
                        'firstname' : user.firstname,
                        'email' : rootRef.getAuth().password.email
                    };
                    rootRef.child('levels').child($scope.user.level).on('value', function(dataSnapshot) {
                        var level = dataSnapshot.val();
                        $timeout(function() {
                            $scope.level = level;
                        }, 1);
                    });
                }, 1);
                $location.path('app/dashboard');
            });
        } else {
            $location.path('access/signin');
            console.log('déconnecté');
        }

        $scope.isModifiable     = false;
        $scope.modifierInfos    = function () {
            ($scope.isModifiable == false) ? $scope.isModifiable = true : $scope.isModifiable = false;
        };
        $scope.modifierUser     = function () {
            $scope.isModifiable = false;
        };
        $scope.addUser          = function (user) {
            rootRef.createUser({
                email    : user.email,
                password : user.password
            }, function(error, userData) {
                if (error) {
                    console.log("Error creating user:", error);
                } else {
                    console.log("Successfully created user account with uid:", userData.uid);
                }
            });
        };

        $scope.user         = { 'email' : '', 'password' : ''};
        $scope.errorSignin  = '';
        $scope.submit       = function () {
            $scope.btnConnect = "<span class='fa fa-spinner fa-spin'></span>";
            rootRef.authWithPassword({
                email : $scope.user.email,
                password : $scope.user.password
            }, function(error, authData) {
                $timeout(function() {
                    if (error) {
                        switch (error.code) {
                            case "INVALID_EMAIL":
                                $scope.errorSignin = "L'adresse email est invalide.";
                                break;
                            case "INVALID_PASSWORD":
                                $scope.errorSignin = "Le mot de passe est invalide.";
                                break;
                            case "INVALID_USER":
                                $scope.errorSignin = "L'utilisateur n'existe pas.";
                                break;
                            default:
                                $scope.errorSignin = "Erreur de connexion : " + error;
                        }
                    } else {
                        rootRef.child('users').child(authData.uid).on('value', function(dataSnapshot) {
                            var user = dataSnapshot.val();
                            $scope.user = {
                                'uid' : authData.uid,
                                'level' : user.level,
                                'name' : user.name,
                                'firstname' : user.firstname,
                                'email' : authData.password.email
                            };
                            $timeout(function() {
                                console.log($scope.user);
                                $location.path('app/dashboard');
                            }, 1);
                        });
                    }
                }, 1);
            });
        };

        $scope.deconnection = function () {
            rootRef.unauth();
        };

        $localStorage.settings = $scope.app.settings;

        $scope.$watch('app.settings', function () {
            $localStorage.settings = $scope.app.settings;
        }, true);
    }])
    .controller('DropdownDemoCtrl', ['$scope', function ($scope) {
        $scope.items = [
            'The first choice!',
            'And another choice for you.',
            'but wait! A third!'
        ];

        $scope.status = {
            isopen: false
        };

        $scope.toggled = function (open) {
            //console.log('Dropdown is now: ', open);
        };

        $scope.toggleDropdown = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.status.isopen = !$scope.status.isopen;
        };
    }])
    .controller('ModalDemoCtrl', ['$scope', '$modal', '$log', function ($scope, $modal, $log) {
        $scope.items = ['item1', 'item2', 'item3'];
        var ModalInstanceCtrl = function ($scope, $modalInstance, items) {
            $scope.items = items;
            $scope.selected = {
                item: $scope.items[0]
            };

            $scope.ok = function () {
                $modalInstance.close($scope.selected.item);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };

        $scope.open = function (size) {
            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: ModalInstanceCtrl,
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
    }])
    .controller('PaginationDemoCtrl', ['$scope', '$log', function ($scope, $log) {
        $scope.totalItems = 64;
        $scope.currentPage = 4;

        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function () {
            $log.info('Page changed to: ' + $scope.currentPage);
        };

        $scope.maxSize = 5;
        $scope.bigTotalItems = 175;
        $scope.bigCurrentPage = 1;
    }])
    .controller('PopoverDemoCtrl', ['$scope', function ($scope) {
        $scope.dynamicPopover = 'Hello, World!';
        $scope.dynamicPopoverTitle = 'Title';
    }])
    .controller('ProgressDemoCtrl', ['$scope', function ($scope) {
        $scope.max = 200;

        $scope.random = function () {
            var value = Math.floor((Math.random() * 100) + 1);
            var type;

            if (value < 25) {
                type = 'success';
            } else if (value < 50) {
                type = 'info';
            } else if (value < 75) {
                type = 'warning';
            } else {
                type = 'danger';
            }

            $scope.showWarning = (type === 'danger' || type === 'warning');

            $scope.dynamic = value;
            $scope.type = type;
        };
        $scope.random();

        $scope.randomStacked = function () {
            $scope.stacked = [];
            var types = ['success', 'info', 'warning', 'danger'];

            for (var i = 0, n = Math.floor((Math.random() * 4) + 1); i < n; i++) {
                var index = Math.floor((Math.random() * 4));
                $scope.stacked.push({
                    value: Math.floor((Math.random() * 30) + 1),
                    type: types[index]
                });
            }
        };
        $scope.randomStacked();
    }])
    .controller('TabsDemoCtrl', ['$scope', function ($scope) {
        $scope.tabs = [
            { title: 'Dynamic Title 1', content: 'Dynamic content 1' },
            { title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true }
        ];
    }])
    .controller('RatingDemoCtrl', ['$scope', function ($scope) {
        $scope.rate = 7;
        $scope.max = 10;
        $scope.isReadonly = false;

        $scope.hoveringOver = function (value) {
            $scope.overStar = value;
            $scope.percent = 100 * (value / $scope.max);
        };
    }])
    .controller('TooltipDemoCtrl', ['$scope', function ($scope) {
        $scope.dynamicTooltip = 'Hello, World!';
        $scope.dynamicTooltipText = 'dynamic';
        $scope.htmlTooltip = 'I\'ve been made <b>bold</b>!';
    }])
    .controller('TypeaheadDemoCtrl', ['$scope', '$http', function ($scope, $http) {
        $scope.selected = undefined;
        $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
        // Any function returning a promise object can be used to load values asynchronously
        $scope.getLocation = function (val) {
            return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: val,
                    sensor: false
                }
            }).then(function (res) {
                var addresses = [];
                angular.forEach(res.data.results, function (item) {
                    addresses.push(item.formatted_address);
                });
                return addresses;
            });
        };
    }])
    .controller('DatepickerDemoCtrl', ['$scope', function ($scope) {
        $scope.today = function () {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function () {
            $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function (date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        $scope.toggleMin = function () {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1,
            class: 'datepicker'
        };

        $scope.initDate = new Date('2016-15-20');
        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
    }])
    .controller('TimepickerDemoCtrl', ['$scope', function ($scope) {
        $scope.mytime = new Date();

        $scope.hstep = 1;
        $scope.mstep = 15;

        $scope.options = {
            hstep: [1, 2, 3],
            mstep: [1, 5, 10, 15, 25, 30]
        };

        $scope.ismeridian = true;
        $scope.toggleMode = function () {
            $scope.ismeridian = !$scope.ismeridian;
        };

        $scope.update = function () {
            var d = new Date();
            d.setHours(14);
            d.setMinutes(0);
            $scope.mytime = d;
        };

        $scope.changed = function () {
            //console.log('Time changed to: ' + $scope.mytime);
        };

        $scope.clear = function () {
            $scope.mytime = null;
        };
    }])

    // Form controller
    .controller('FormDemoCtrl', ['$scope', function ($scope) {
        $scope.notBlackListed = function (value) {
            var blacklist = ['bad@domain.com', 'verybad@domain.com'];
            return blacklist.indexOf(value) === -1;
        }
    }])

    // Flot Chart controller
    .controller('FlotChartDemoCtrl', ['$scope', function ($scope) {
        $scope.d = [
            [1, 6.5],
            [2, 6.5],
            [3, 7],
            [4, 8],
            [5, 7.5],
            [6, 7],
            [7, 6.8],
            [8, 7],
            [9, 7.2],
            [10, 7],
            [11, 6.8],
            [12, 7]
        ];

        $scope.d0_1 = [
            [0, 7],
            [1, 6.5],
            [2, 12.5],
            [3, 7],
            [4, 9],
            [5, 6],
            [6, 11],
            [7, 6.5],
            [8, 8],
            [9, 7]
        ];

        $scope.d0_2 = [
            [0, 4],
            [1, 4.5],
            [2, 7],
            [3, 4.5],
            [4, 3],
            [5, 3.5],
            [6, 6],
            [7, 3],
            [8, 4],
            [9, 3]
        ];

        $scope.d1_1 = [
            [10, 120],
            [20, 70],
            [30, 70],
            [40, 60]
        ];

        $scope.d1_2 = [
            [10, 50],
            [20, 60],
            [30, 90],
            [40, 35]
        ];

        $scope.d1_3 = [
            [10, 80],
            [20, 40],
            [30, 30],
            [40, 20]
        ];

        $scope.d2 = [];

        for (var i = 0; i < 20; ++i) {
            $scope.d2.push([i, Math.sin(i)]);
        }

        $scope.d3 = [
            { label: "iPhone5S", data: 40 },
            { label: "iPad Mini", data: 10 },
            { label: "iPad Mini Retina", data: 20 },
            { label: "iPhone4S", data: 12 },
            { label: "iPad Air", data: 18 }
        ];

        $scope.getRandomData = function () {
            var data = [],
                totalPoints = 150;
            if (data.length > 0)
                data = data.slice(1);
            while (data.length < totalPoints) {
                var prev = data.length > 0 ? data[data.length - 1] : 50,
                    y = prev + Math.random() * 10 - 5;
                if (y < 0) {
                    y = 0;
                } else if (y > 100) {
                    y = 100;
                }
                data.push(y);
            }
            // Zip the generated y values with the x values
            var res = [];
            for (var i = 0; i < data.length; ++i) {
                res.push([i, data[i]])
            }
            return res;
        }

        $scope.d4 = $scope.getRandomData();

    }])
;