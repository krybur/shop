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

controllersSite.controller( 'siteOrders' , [ '$scope' , '$http' , 'checkToken' , function( $scope , $http , checkToken ){

  $http.post( 'api/site/orders/get/' , {

    token: checkToken.raw(),
    payload: checkToken.payload()

  }).success( function( data ){

    $scope.orders = data;

    angular.forEach( $scope.orders , function( order , key ){
      var parsed = JSON.parse( order.items );
      $scope.orders[key].items = parsed;
      console.log(parsed);
    });

  }).error( function(){
    console.log( 'Błąd połączenia z API' );
  });

}]);


controllersSite.controller( 'cartCtrl' , [ '$scope' , '$http' , 'cartSrv', 'checkToken' , function( $scope , $http, cartSrv, checkToken ){
 
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

    $event.preventDefault(); // to będzie blokowało wysłanie formularza do paypala, po to by np zapisac zamowienie w bazie wczesniej
     if (!checkToken.loggedIn())
     {
      $scope.alert = {type : 'warning' , msg: 'Musisz być zalogowany, żeby złożyć zamowienie' };
      
      return false ;

    }

    $http.post( 'api/site/orders/create/' , {
      token: checkToken.raw(),
      payload: checkToken.payload(),
      items: $scope.cartSrv,
      total: $scope.total()

    }).
      success( function( data ){
        cartSrv.clear();
        $scope.alert = {type: 'success' , msg: "Zamówienie złożone, nie odświeżaj strony, trwa przekierowywanie"};
        $('#paypalForm').submit() ;

      }).error( function(){
    console.log( 'Błąd połączenia z API' );

  });

  }

  $scope.$watch(function(){
    cartSrv.update ($scope.cartSrv);
  })

 
}]);


controllersSite.controller( 'login' , [ '$scope' , '$http' , 'store', 'checkToken', '$location',  function( $scope ,  $http, store, checkToken, $location ){
  
 if ( checkToken.loggedIn())
    $location.path('/products');
 
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
         location.reload();


        }

    }).error( function() {
      console.log('Błąd połączenia z API');
    });
   
    };

   console.log(checkToken.payload());
  
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