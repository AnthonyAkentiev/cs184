var app = angular.module("app", []);

// HTTP get/post
app.controller("AppCtrl",function($scope,$http){
     this.random = Math.random();
	
	var app = this;

	$http.get("people.js")
		.success(function(data){
			app.people = data;
		});

	app.addPerson = function(person){
		$http.post("people.js",person).
			success(function(data){
				console.log(data);
			});	
	}
});

app.filter('reverse',function(){
     return function(txt){
          return txt.split("").reverse().join("");
     };
});

// This will allow TRUE-DOM in index.html
app.directive("app",function(){
     return {
          // restrict to Class
          restrict: "C",

          controller: "AppCtrl as app"
     };
});

angular.bootstrap(document.getElementById("container"), ["app"]);


