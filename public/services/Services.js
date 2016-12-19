var app = angular.module('Services', []);

app.factory('focus', function($timeout, $window) {
  return function(id) {
    $timeout(function() {
      var element = $window.document.getElementById(id);
      if(element)
        element.focus();
    });
  };
});

app.factory('HeroAPI', function($http){
  var HeroAPI = function() {
      this.heroes = [];
      this.busy = false;
      this.page = 1;
    };

    HeroAPI.prototype.initialLoad = function(){
      $http.get('/fullList').then(function(items){
        this.heroes = items.data
      }.bind(this));
    }

    HeroAPI.prototype.nextPage = function() {
      if (this.busy) return;
      this.busy = true;
      $http.get('/fullList?page=' + this.page).then(function(items){
        var heroes = items.data;
        for (var i = 0; i < heroes.length; i++) {
          this.heroes.push(heroes[i]);
        }
        this.page = this.page++;
        this.page++;
        this.busy = false;
      }.bind(this));
    }

  return HeroAPI;
});