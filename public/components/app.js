var appRouter = angular.module('mainApp', ['ui.router', 'HomeApp']);

appRouter.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'templates/partial-home.html',
            controller: 'HomeCtrl',
            controllerAs: 'home'
        })

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
});