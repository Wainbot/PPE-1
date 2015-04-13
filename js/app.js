'use strict';

var app = angular.module('app', [
            'ngAnimate',
            'ngCookies',
            'ngStorage',
            'ui.router',
            'ui.bootstrap',
            'ui.load',
            'ui.jq',
            'ui.validate',
            'pascalprecht.translate',
            'app.filters',
            'app.services',
            'app.directives',
            'app.controllers',
            'ngSanitize'
        ])
        .run(['$rootScope', '$state', '$stateParams', '$location', '$timeout', function ($rootScope, $state, $stateParams) {
            $rootScope.$state       = $state;
            $rootScope.$stateParams = $stateParams;
        }])
        .config(
            ['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {
                    app.controller  = $controllerProvider.register;
                    app.directive   = $compileProvider.directive;
                    app.filter      = $filterProvider.register;
                    app.factory     = $provide.factory;
                    app.service     = $provide.service;
                    app.constant    = $provide.constant;

                    $urlRouterProvider
                        .otherwise('/access/signin');
                    $stateProvider
                        .state('app', {
                            abstract: true,
                            url: '/app',
                            templateUrl: 'tpl/app.html',
                            controller: 'AppController'
                        })
                        .state('app.dashboard', {
                            url: '/dashboard',
                            templateUrl: 'tpl/app_dashboard.html',
                            controller: 'DashboardController'
                        })
                        .state('app.panier', {
                            url: '/panier',
                            templateUrl: 'tpl/app_panier.html',
                            controller: 'PanierController'
                        })
                        .state('app.salles', {
                            url: '/salles',
                            templateUrl: 'tpl/app_salles.html',
                            controller: 'SallesController'
                        })
                        .state('app.materiels', {
                            url: '/materiels',
                            templateUrl: 'tpl/app_materiels.html',
                            controller: 'MaterielsController'
                        })
                        .state('app.infos', {
                            url: '/infos/:id',
                            templateUrl: 'tpl/form_infos.html',
                            controller: 'InfosUserController'
                        })
                        .state('app.table', {
                            url: '/table',
                            template: '<div ui-view></div>'
                        })
                        .state('app.table.users', {
                            url: '/users',
                            templateUrl: 'tpl/table_users.html',
                            controller: 'UsersController'
                        })
                        .state('app.form', {
                            url: '/form',
                            template: '<div ui-view class="fade-in"></div>'
                        })
                        .state('app.form.newuser', {
                            url: '/newuser',
                            templateUrl: 'tpl/form_new_user.html',
                            controller: 'NewUserController'
                        })
                        .state('app.page', {
                            url: '/page',
                            template: '<div ui-view class="fade-in-down"></div>'
                        })
                        .state('access', {
                            url: '/access',
                            template: '<div ui-view class="fade-in-right-big smooth"></div>'
                        })
                        .state('access.signin', {
                            url: '/signin',
                            templateUrl: 'tpl/page_signin.html',
                            controller: 'SigninController'
                        })
                        .state('access.forgotpwd', {
                            url: '/forgotpwd',
                            templateUrl: 'tpl/page_forgotpwd.html'
                        })
                        .state('access.mentionslegales', {
                            url: '/mentionslegales',
                            templateUrl: 'tpl/mentions_legales.html'
                        })
                        .state('access.contact', {
                            url: '/contact',
                            templateUrl: 'tpl/contact.html'
                        })
                        .state('access.sitemap', {
                            url: '/sitemap',
                            templateUrl: 'tpl/sitemap.html'
                        })
                        .state('app.404', {
                            url: '/404',
                            templateUrl: 'tpl/page_404.html'
                        })
                        .state('app.calendar', {
                            url: '/calendar',
                            templateUrl: 'tpl/app_calendar.html',
                            resolve: {
                                deps: ['uiLoad',
                                    function (uiLoad) {
                                        return uiLoad.load(['js/jquery/fullcalendar/fullcalendar.css',
                                            'js/jquery/jquery-ui-1.10.3.custom.min.js',
                                            'js/jquery/fullcalendar/fullcalendar.min.js',
                                            'js/app/calendar/ui-calendar.js',
                                            'js/app/calendar/calendar.js']);
                                    }]
                            },
                            controller: 'AgendaController'
                        })
                }
            ]
        )

        /**
         * jQuery plugin config use ui-jq directive , config the js and css files that required
         * key: function name of the jQuery plugin
         * value: array of the css js file located
         */
        .constant('JQ_CONFIG', {
            easyPieChart: ['js/jquery/charts/easypiechart/jquery.easy-pie-chart.js'],
            sparkline: ['js/jquery/charts/sparkline/jquery.sparkline.min.js'],
            plot: ['js/jquery/charts/flot/jquery.flot.min.js',
                'js/jquery/charts/flot/jquery.flot.resize.js',
                'js/jquery/charts/flot/jquery.flot.tooltip.min.js',
                'js/jquery/charts/flot/jquery.flot.spline.js',
                'js/jquery/charts/flot/jquery.flot.orderBars.js',
                'js/jquery/charts/flot/jquery.flot.pie.min.js'],
            slimScroll: ['js/jquery/slimscroll/jquery.slimscroll.min.js'],
            sortable: ['js/jquery/sortable/jquery.sortable.js'],
            nestable: ['js/jquery/nestable/jquery.nestable.js',
                'js/jquery/nestable/nestable.css'],
            filestyle: ['js/jquery/file/bootstrap-filestyle.min.js'],
            slider: ['js/jquery/slider/bootstrap-slider.js',
                'js/jquery/slider/slider.css'],
            chosen: ['js/jquery/chosen/chosen.jquery.min.js',
                'js/jquery/chosen/chosen.css'],
            TouchSpin: ['js/jquery/spinner/jquery.bootstrap-touchspin.min.js',
                'js/jquery/spinner/jquery.bootstrap-touchspin.css'],
            wysiwyg: ['js/jquery/wysiwyg/bootstrap-wysiwyg.js',
                'js/jquery/wysiwyg/jquery.hotkeys.js'],
            dataTable: ['js/jquery/datatables/jquery.dataTables.min.js',
                'js/jquery/datatables/dataTables.bootstrap.js',
                'js/jquery/datatables/dataTables.bootstrap.css'],
            vectorMap: ['js/jquery/jvectormap/jquery-jvectormap.min.js',
                'js/jquery/jvectormap/jquery-jvectormap-world-mill-en.js',
                'js/jquery/jvectormap/jquery-jvectormap-us-aea-en.js',
                'js/jquery/jvectormap/jquery-jvectormap.css'],
            footable: ['js/jquery/footable/footable.all.min.js',
                'js/jquery/footable/footable.core.css']
        }
    )
    ;