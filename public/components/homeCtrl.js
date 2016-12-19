var app = angular.module('HomeApp', ['AppDirectives', 'Services', 'infinite-scroll']);

app.controller('HomeCtrl', ['$http', 'HeroAPI', function($http, HeroAPI){
	var that = this;
	this.heroAPI = new HeroAPI();
	this.heroAPI.initialLoad();
}]);