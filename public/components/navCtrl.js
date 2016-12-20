let nav = angular.module('NavApp', []);

nav.component('navBar', {
	template: `
	<nav class="navbar comicfy" role="navigation">
	    <div class="navbar-header">
	        <a class="navbar-brand" ui-sref="#">Marvel Card Collection</a>
	    </div>
	    <div class="searchContainer" ng-class="$ctrl.activeSearch ? 'slide-out' : 'slide-in'">
		    <p class="search"  ng-click="$ctrl.toggleSearch()"><span class="glyphicon glyphicon-search"></span> Search</p>
		    <input ng-model="$ctrl.searchTerm" class="form-control" ng-blur="$ctrl.toggleSearch()" focus-on="focusMe"/>
	    </div>
	</nav>
	`,
	controller: function(focus){
		this.activeSearch = false;

		this.toggleSearch = function(){
			this.activeSearch = !this.activeSearch;
			if (this.activeSearch) {
				setTimeout(function(){
					focus('focusMe')
				},500);
			} else {
				this.searchTerm = "";
			}
		}
	}
});

nav.directive('focusOn', function() {
   return function(scope, elem, attr) {
      scope.$on('focusOn', function(e, name) {
        if(name === attr.focusOn) {
          elem[0].focus();
        }
      });
   };
});

nav.factory('focus', function ($rootScope, $timeout) {
  return function(name) {
    $timeout(function (){
      $rootScope.$broadcast('focusOn', name);
    });
  }
});
