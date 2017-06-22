'use strict';

var controllersNavigation = angular.module('controllersNavigation', [] );



controllersNavigation.controller( 'navigation' , [ '$scope' , 'cartSrv', '$location' , function( $scope , cartSrv, $location ){
  $scope.navigation = function (){
  if( /^\/admin/.test($location.path()) ){
    
    return 'partials/admin/navigation.html' ;

  }
  else {
   
       return 'partials/site/navigation.html' ;
  }
}
  $scope.isActive = function ( path ) {
    return $location.path() === path;
  };

  $scope.$watch(function(){
    $scope.cartSrv = cartSrv.show().length;
  })



}]);

