var appRouter = angular.module('mainApp', ['ui.router', 'HomeApp', 'AboutApp']);

appRouter.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'templates/partial-home.html',
            controller: 'HomeCtrl',
            controllerAs: 'home'
        })
        .state('about', {
        	url: '/about',
        	templateUrl: 'templates/partial-about.html',
        	controller: 'AboutCtrl',
        	controllerAs: 'about'
        })
});