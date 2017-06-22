'use strict';

var app = angular.module( 'app' , ['ngRoute', 'angular-storage' , 'controllersNavigation', 'controllersAdmin' , 'controllersSite', 'myServices'] );   //'ngRoute to poprostu dołączony moduł ngroute, który podpięto do projektu'

app.config( [ '$routeProvider' , '$httpProvider' , function( $routeProvider, $httpProvider ){

  $routeProvider.when( '/admin/products', {
    controller : 'products',
    templateUrl : 'partials/admin/products.html'
  } ); //to jak przekieruje na strone wybranego produktu

  $routeProvider.when( '/admin/product/edit/:id', {
    controller: 'productEdit', 
    templateUrl: 'partials/admin/produkt-edit.html'
  } ); // httpprovider służy do pobierania z adresu i przekierowwyania/ wpisuje sie po sleszu w przeglądarce

    $routeProvider.when( '/admin/product/create', {
    controller: 'productCreate', 
    templateUrl: 'partials/admin/produkt-create.html'
  } ); 

//==========================================DEFAULT=======================

  $routeProvider.otherwise( {
    redirectTo: '/home' // jak wpiszemy w adresie jakies gowno, to przekirujena głowną
  });

 //konfigurujemy tego routa, provider śledzi przekierowywania i zmiany adresu w przeglądarce


//==============================================USERS===========================================

   $routeProvider.when( '/admin/users', {
    controller: 'users', 
    templateUrl: 'partials/admin/users.html'
  } ); 


  $routeProvider.when( '/admin/user/edit/:id' , {
    controller: 'userEdit',
    templateUrl : 'partials/admin/user-edit.html'
  });

 // httpprovider służy do pobierania z adresu i przekierowwyania/ wpisuje sie po sleszu w przeglądarce

  $routeProvider.when( '/admin/user/create' , {
    controller: 'userCreate',
    templateUrl : 'partials/admin/user-create.html'
  });

//==============================================ORDERS===========================================

   $routeProvider.when( '/admin/orders', {
    controller: 'orders', 
    templateUrl: 'partials/admin/orders.html'
  } ); 


//==============================================SITE PRODUCTS==========================================

 $routeProvider.when( '/products', {
    controller : 'siteProducts',
    templateUrl : 'partials/site/products.html'
  } ); //to jak przekieruje na strone wybranego produktu

  $routeProvider.when( '/product/:id', {
    controller: 'siteProduct', 
    templateUrl: 'partials/site/product.html'
  } ); // httpprovider służy do pobierania z adresu i przekierowwyania/ wpisuje sie po sleszu w przeglądarce

    $routeProvider.when( '/cart', {
    controller: 'cartCtrl', 
    templateUrl: 'partials/site/cart.html'
  } );

    $routeProvider.when( '/orders' , {
      controller: 'siteOrders',
      templateUrl: 'partials/site/orders.html'
    });
//==============================================LOGIN & REGISTER==========================================
     $routeProvider.when( '/login' , {
      controller: 'login',
      templateUrl: 'partials/site/login.html'
    });
    
     $routeProvider.when( '/register' , {
      controller: 'register',
      templateUrl: 'partials/site/register.html'
    });
    

}] );

