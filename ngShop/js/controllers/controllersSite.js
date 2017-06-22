'use strict';
var controllersSite = angular.module('controllersSite', [] );



controllersSite.controller( 'siteProducts' , [ '$scope' , '$http', 'cartSrv', '$routeParams' , function( $scope , $http, cartSrv, $routeParams ){

      
      $http.get('api/site/products/get/').
      success(function (data){
        $scope.products = data ; 
        
      }).
      error(function(){
        console.log('Błąd pobrania danych');
      });

      $scope.addToCart = function(product) {

          cartSrv.add(product);
       
      }

      $scope.checkCart = function(product) {

        if(cartSrv.show().length)
          {
            angular.forEach(cartSrv.show(), function(item){
              
              if (item.id == product.id) 
                product.qty = item.qty ;

            })
          }
      }

}]);


controllersSite.controller( 'siteProduct' , [ '$scope' , '$http' , '$routeParams', 'cartSrv' , function( $scope , $http, $routeParams, cartSrv ){
  
  var id = $routeParams.id ;
  $http.post('api/site/products/get/' + id).
  success(function (data){
    
    $scope.product = data;
    $scope.checkCart( data); // albo zamiast daty $scope.product;
    
  }).
  error(function(){
        console.log('Błąd pobrania danych');
      });

  $scope.addToCart = function(product) {

        cartSrv.add( product );

      }

        $scope.checkCart = function(product) {

        if(cartSrv.show().length)
          {
            angular.forEach(cartSrv.show(), function(item){
              
              if (item.id == product.id) 
                product.qty = item.qty ;

            })
          }
      }

   function getImages() {
      $http.get( 'api/site/products/getImages/' + id).
      success( function( data ){
      $scope.images = data;
      }).error( function(){
    console.log( 'Błąd połączenia z API' );
  });

  } 
  getImages();

}]);

controllersSite.controller( 'siteOrders' , [ '$scope' , '$http' , function( $scope , $http ){
  
  $http.get('model/orders.json').
  success(function (data){
    $scope.orders = data ;
  }).
  error(function(){
        console.log('Błąd pobrania danych');
      });

}]);

controllersSite.controller( 'cartCtrl' , [ '$scope' , '$http' , 'cartSrv' , function( $scope , $http, cartSrv ){
 
  $scope.cartSrv = cartSrv.show();

  $scope.clearCart = function() {
    if ( !confirm('Na pewno chcesz wyczyśścić koszyk??'))
      return false ;  
    cartSrv.clear('koszyk pusty');
  };

  $scope.total = function () {

    var total = 0;
    angular.forEach($scope.cartSrv, function (item){
      
      total += item.qty * item.cena ;
    });

    return total ;
    
  };

  $scope.removeItem = function($index) {
    $scope.cartSrv.splice($index, 1);
    cartSrv.removeItem($scope.cartSrv); // rownie dobrze może być tu cartSrv.update(scope.cartSrv); bo to dziala tak samo jak update poniżej, wykrywa zmiany i nadpisuje koszyk

  }

  $scope.setOrder = function($event) {

    // TODO sprawdzić czy użytkownik zalogowany
    var loggedIn = true;
    if (!loggedIn){
      $scope.alert = {type : 'warning' , msg: 'Musisz być zalogowany, żeby złożyć zamowienie' };
      $event.preventDefault();
      return false ;

    }

    //TODO zapisz zamowienie w bazie

    console.log($scope.total() );
    console.log($scope.cartSrv  );
    $scope.alert = { type : 'success' , msg: 'Zamówienie złożone, nie odświeżaj strony, trwa realizowanie płatności...' }
    cartSrv.clearCart();

    $event.preventDefault(); // to będzie blokowało wysłanie formularza do paypala, po to by np zapisac zamowienie w bazie wczesniej
    $('#paypalForm').submit() ;

  }

  $scope.$watch(function(){
    cartSrv.update ($scope.cartSrv);
  })

 
}]);


controllersSite.controller( 'login' , [ '$scope' , '$http' , 'store',  function( $scope , $http, store ){
  
  $scope.user = {};

  $scope.formSubmit = function(user){
    $http.post('api/site/user/login/' , {
      email: user.email,
      password: user.password
    }).success(function (data) {

        $scope.submit = true;
        $scope.error = data.error;

        if(!data.error){

          store.set('token', data.token);
        }

    }).error( function() {
      console.log('Błąd połączenia z API');
    });
    };

    console.log(store.get('token'));
  
}]);

controllersSite.controller( 'register' , [ '$scope' , '$http' , function( $scope , $http ){
  
     $scope.user = {} ;
    $scope.formSubmit = function ( user ) {


      $http.post('api/site/user/create/' , {
      user : user,
      name : user.name,
      email: user.email,
      password: user.password,
      passconf: user.passconf
      
    }).success(function(errors){

      $scope.submit = true;
      $scope.user = {};

      if(errors)
      {
        $scope.errors = errors;
        $scope.success = false;

      }
      else {
               $scope.errors = {};
               $scope.success = true;

          }
      }).error(function(){
        console.log('Błąd połączenia z bazą danych');

      
      
      });

  };
}]);