'use strict';

var controllersNavigation = angular.module('controllersNavigation', [] );



controllersNavigation.controller( 'navigation' , [ '$scope' , 'cartSrv', '$location', 'checkToken' , function( $scope , cartSrv, $location, checkToken ){
    $scope.navigation = function (){
  if( /^\/admin/.test($location.path()) ){

    if (!checkToken.isAdmin())
      {
       $location.path('/products'); //window.location.href ='#/products?alert=noAdmin';  można natywnie w JavaScripcie bo angualrowskie location.path('/products'); nie wrzuca tego ?alert=...
      }
    
    return 'partials/admin/navigation.html' ;

  }
  else {
/*       if(location.search().admin =='noAdmin') // to ciekawa funkcjonalność, któa przeszkuje pasek adresu i wyciąga z niego wartości parametrów tu np admin, to jakbym używał window.location.href i wyświetlał komunikat na stronie że nie jesteś adminem, ale moim zdaniem to bzdura
        $scope.noAdmin = true;
      else
        $scope.noAdmin = false; */
      if( checkToken.loggedIn())
        $scope.loggedIn = true;
      else
        $scope.loggedIn = false;

      if( checkToken.isAdmin())
        $scope.isAdmin = true;
      else
        $scope.isAdmin = false;

      return 'partials/site/navigation.html' ;
  }
}
  $scope.isActive = function ( path ) {
    return $location.path() === path;
  };

  $scope.$watch(function(){
    $scope.cartSrv = cartSrv.show().length;
  })

  $scope.logout = function() {

      checkToken.del();
      location.reload(); // natywny javascript
  }



}]);

