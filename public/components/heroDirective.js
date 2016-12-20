var app = angular.module('AppDirectives', ['Services']);

app.directive('heroShow', function(){
	return {
		restrict: 'E',
		templateUrl: 'templates/heroDirective.html',
		scope: {
			hero: '='
		},
		controller: function(){
			this.classes=["bottomLeft", "topRight", "bottomRight", "topLeft"];
		},
		controllerAs: 'card'
	}
});

app.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});

app.directive("flip", function(){
  
  function setDim(element, width, height){
    element.style.width = width;
    element.style.height = height;
  }
  
  var cssString =
    "<style> \
    .flip {float: left; overflow: hidden} \
    .flipBasic { \
    position: absolute; \
    -webkit-backface-visibility: hidden; \
    backface-visibility: hidden; \
    transition: -webkit-transform .5s; \
    transition: transform .5s; \
    -webkit-transform: perspective( 800px ) rotateY( 0deg ); \
    transform: perspective( 800px ) rotateY( 0deg ); \
    } \
    .flipHideBack { \
    -webkit-transform:  perspective(800px) rotateY( 180deg ); \
    transform:  perspective(800px) rotateY( 180deg ); \
    } \
    .flipHideFront { \
    -webkit-transform:  perspective(800px) rotateY( -180deg ); \
    transform:  perspective(800px) rotateY( -180deg ); \
    } \
    </style> \
    ";
    
  document.head.insertAdjacentHTML("beforeend", cssString);
  
  
  return {
    restrict : "E",
    controller: function($scope, $element, $attrs){
      
      var self = this;
      self.front = null,
      self.back = null;
      
      
      function showFront(){
        self.front.removeClass("flipHideFront");
        self.back.addClass("flipHideBack");
      }
      
      function showBack(){
        self.back.removeClass("flipHideBack");
        self.front.addClass("flipHideFront");
      }
      
      self.init = function(){
        self.front.addClass("flipBasic");
        self.back.addClass("flipBasic");
        
        showFront();
        self.front.on("click", showBack);
        self.back.on("click", showFront);
      }
    
    },
    
    link : function(scope,element,attrs, ctrl){
      
      var width = attrs.flipWidth || "100px",
        height =  attrs.flipHeight || "100px";
      
      element.addClass("flip");
      
      if(ctrl.front && ctrl.back){
        [element, ctrl.front, ctrl.back].forEach(function(el){
          setDim(el[0], width, height);
        });
        ctrl.init();
      }
      else {
        console.error("FLIP: 2 panels required.");
      }
      
    }
  }
});

app.directive("flipPanel", function(){
  return {
    restrict : "E",
    require : "^flip",
    //transclusion : true,
    link: function(scope, element, attrs, flipCtr){
      if(!flipCtr.front) {flipCtr.front = element;}
      else if(!flipCtr.back) {flipCtr.back = element;}
      else {
        console.error("FLIP: Too many panels.");
      }
    }
  }
});

app.directive("ngRandomClass", function () {
	return {
	    restrict: 'EA',
	    replace: false,
	    scope: {
	        ngClasses: "="
	    },
	    link: function (scope, elem, attr) {            

	        //Add random background class to selected element
	        elem.addClass(scope.ngClasses[Math.floor(Math.random() * (scope.ngClasses.length))]);
	    }
	}
});

app.directive('focusOn', function() {
   return function(scope, elem, attr) {
      scope.$on(attr.focusOn, function(e) {
          elem[0].focus();
      });
   };
});