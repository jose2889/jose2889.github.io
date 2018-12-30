 var app = angular.module('myapp', ['ngPagination', 'ngRoute']);
 app.controller('ctrlpaginado', function($scope, $http, $location) {
     $scope.personas = [];
     $scope.myUrl = $location.absUrl();
     $http.get('https://randomuser.me/api/?results=50').success(function(response) {
         $scope.personas = response.results;
         console.log($scope.personas);
     });
 });

 app.controller('mainCtrl', function($scope, $location) {

     $scope.myUrl = $location.absUrl();
 });

 app.config(function($routeProvider, $locationProvider) {
     $routeProvider
         .when("/", {
             templateUrl: "view/inicio.html"
         })
         .when("/tabla", {
             templateUrl: "view/tabla.html",
             controller: "ctrlpaginado"
         })
         .otherwise({
             templateUrl: "view/inicio.html"
         });

     $locationProvider.html5Mode(true);
 });