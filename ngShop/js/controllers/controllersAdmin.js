'use strict';

var controllersAdmin = angular.module('controllersAdmin' , ['angularFileUpload', 'myDirectives']);

controllersAdmin.controller( 'products' , [ '$scope' , '$http', 'checkToken' , function( $scope , $http, checkToken){

  $http.post( 'api/admin/products/get/', {
    token : checkToken.raw()
  } ). // opuszczamy application i controllers bo chyba domyslnie to przenosi, ostatnie to funkcja zapisana w kontrolerze
  success( function( data ){
    $scope.products = data;
  }).error( function(){
    console.log( 'Błąd pobrania pliku json' );
  });

   $scope.delete = function(product, $index){
    //przeslac dane przez api
   
    if (!confirm('Czy na pewno chcesz usunac produkt?'))
      return false; // chodzi o to by zatrzymac funkcje jak dasz anuluj
    
    $scope.products.splice( $index, 1 ); //(ktory indeks zaczyna, ile elementow usunac, ewentualnie dodac)

    $http.post( 'api/admin/products/deleteProduct/' , {
      product:product,
      token: checkToken.raw() 
    }).error( function(){
      console.log('Produk nie został usunięty z bazy - błąd komunikacji api')
    })
      };

     
}]);

controllersAdmin.controller( 'productEdit' , [ '$scope' , '$http' , '$routeParams' , 'FileUploader' , '$timeout', 'checkToken' , function( $scope , $http , $routeParams, FileUploader, $timeout, checkToken ){

  var productId = $routeParams.id ; //do wyswietlania zdjec
  $scope.id = productId;

  $http.post( 'api/admin/products/get/' + productId, {
    token: checkToken.raw()
  } ).
  success( function( data ){
    
    $scope.product = data; // tak było jak nie było połączenia z bazą : $scope.product = products[productId];
  }).error( function(){
    console.log( 'Błąd pobrania pliku json' );
  });

  function getImages() {
  $http.post( 'api/admin/images/get/' + productId, {
    token: checkToken.raw()
  }).
  success( function( data ){
    $scope.images = data;
  }).error( function(){
    console.log( 'Błąd pobrania pliku json' );
  });

  $scope.setThumb = function( product, image ) {

    $http.post('api/admin/images/setThumb', {
      token: checkToken.raw(),
      product: product,
      image: image
    }).error( function(){})

    console.log(image);
  };

  } 
  getImages(); // ta część jest w funkcji, która teraz wywołujemy, żeby działał, poniewaz chcemy, zeby obrazki pojawiały sie zaraz po wstawieniu. 

  $scope.saveChanges = function(product) {
                                                //nazwa parametru i wartość
    $http.post( 'api/admin/products/update/' ,  
    { product /*xyz*/ : product ,
      token : checkToken.raw()  
    } ). //drugim parametrem metody post w nawiasie klamrowym sa dane które chcemy przesłać
    success(function( ){
      $scope.success = true;
      $timeout(function(){
        $scope.success = false;
      }, 3000 );
    }).
    error(function(){
      console.log('Błąd pobrania pliku')
    });

     console.log(product);          
  };

  $scope.delImg = function( imageName, $index){
    $scope.images.splice($index, 1);

    $http.post( 'api/admin/images/del/' , {
      id: productId,
      image: imageName,
      token: checkToken.raw()

    }).success( function(  ){ 
      //tu śmiało można wstawic funckje getImages(); i zrezygnowac ze splice wyżej :)

  }).error( function(){
    console.log( 'Błąd pobrania pliku json' );
  });

  }

  var uploader = $scope.uploader = new FileUploader({
    url: 'api/admin/images/upload/' + productId,
    token: checkToken.raw() // ścieżka do api obsługujcego upload plus id 
  })

    uploader.filters.push({           // to jest filtr - tylko obrazki (filtruje po rozszerzeniach)
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
});

  uploader.onCompleteItem = function(fileItem, response, status, headers) {     // jeden z wielu callback'ów  odświerza strone zaraz po wrzuceniu, więc obrazek pojawia sie natychmiast, bez odswiezania strony
            getImages();
};  
  
}]);

controllersAdmin.controller( 'productCreate' , [ '$scope' , '$http', '$timeout', 'FileUploader', '$routeParams', 'checkToken' , function( $scope , $http, $timeout, FileUploader, $routeParams, checkToken){

  var productId = $routeParams.id ; //do wyswietlania zdjec
  $scope.id = productId;

  $scope.createProduct = function(product) {
    $http.post( 'api/admin/products/createProduct/' ,  { product /*xyz*/ : product, token: checkToken.raw()} ). 
    success(function( ){
      $scope.success = true;
      $timeout(function(){
        $scope.product={};
        $scope.success = false;
      }, 3000 );
    }).
    error(function(){
      console.log('Błąd pobrania pliku')
    });

     console.log(product);          
  };

function getImages() {
  $http.post( 'api/admin/images/get/' + productId, {
    token : checkToken.raw()
  }).
  success( function( data ){
    $scope.images = data;
  }).error( function(){
    console.log( 'Błąd pobrania pliku json' );
  });

  } 
  getImages(); // ta część jest w funkcji, która teraz wywołujemy, żeby działał, poniewaz chcemy, zeby obrazki pojawiały sie zaraz po wstawieniu. 

  $scope.saveChanges = function(product) {
                                                //nazwa parametru i wartość
    $http.post( 'api/admin/products/update/' ,  { product /*xyz*/ : product, token: checkToken.raw()} ). //drugim parametrem metody post w nawiasie klamrowym sa dane które chcemy przesłać
    success(function( ){
      $scope.success = true;
      $timeout(function(){
        $scope.success = false;
      }, 3000 );
    }).
    error(function(){
      console.log('Błąd pobrania pliku')
    });

     console.log(product);          
  };

  $scope.delImg = function( imageName, $index){
    $scope.images.splice($index, 1);

    $http.post( 'api/admin/images/del/' , {
      id: productId,
      image: imageName,
      token: checkToken.raw()

    }).success( function(  ){ 
      //tu śmiało można wstawic funckje getImages(); i zrezygnowac ze splice wyżej :)

  }).error( function(){
    console.log( 'Błąd pobrania pliku json' );
  });

  }

  var uploader = $scope.uploader = new FileUploader({
    url: 'api/admin/images/upload/' + productId // ścieżka do api obsługujcego upload plus id 
  })

    uploader.filters.push({           // to jest filtr - tylko obrazki (filtruje po rozszerzeniach)
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
});

  uploader.onCompleteItem = function(fileItem, response, status, headers) {     // jeden z wielu callback'ów  odświerza strone zaraz po wrzuceniu, więc obrazek pojawia sie natychmiast, bez odswiezania strony
            getImages();
};  

}]);

controllersAdmin.controller( 'users' , [ '$scope' , '$http', 'checkToken',   function( $scope , $http , checkToken){

  
  $http.post( 'api/admin/users/get', {
    token: checkToken.raw()
  } ). // opuszczamy application i controllers bo chyba domyslnie to przenosi, ostatnie to funkcja zapisana w kontrolerze
  success( function( data ){
    $scope.users = data;
  }).error( function(){
    console.log( 'Błąd pobrania pliku json' );
  });

   $scope.delete = function(user, $index){
       
    if (!confirm('Czy na pewno chcesz usunac użytkownika?'))
      return false; // chodzi o to by zatrzymac funkcje jak dasz anuluj
    
    $scope.users.splice( $index, 1 ); //(ktory indeks zaczyna, ile elementow usunac, ewentualnie dodac)

    $http.post( 'api/admin/users/deleteUser/' , {
      user : user,
      token: checkToken.raw()
    }).error( function(){
      console.log('Użytkownik nie został usunięty z bazy - błąd komunikacji api')
    })
      };

     
}]);



controllersAdmin.controller( 'orders' , [ '$scope' , '$http', 'checkToken' , function( $scope , $http, checkToken ){

  $http.post( 'api/admin/orders/get/', {
    token: checkToken.raw(),
    payload: checkToken.payload()
  } ).
  success( function( data ){
    console.log(data);
    $scope.orders = data;

    angular.forEach( $scope.orders , function( order , key ){
      var parsed = JSON.parse( order.items );
      $scope.orders[key].items = parsed;
    });

  }).error( function(){
    console.log( 'Błąd pobrania pliku json' );
  });

   $scope.delete = function ( order , $index ) {

    if ( !confirm( 'Czy na pewno chcesz usunąć to zamówienie' ) )
      return false;

    $scope.orders.splice( $index , 1 );

    $http.post( 'api/admin/orders/delete/' , {
      token: checkToken.raw(),
      id: order.id
    }).error( function(){
      console.log( 'Błąd połączenia z API' );
    });

  };


  $scope.changeStatus = function(order) {
    if(order.status == 0){
      order.status = 1;
    }
    else{
      order.status = 0;
    }
    
    $http.post( 'api/admin/orders/update/', {
      status: order.status ,
      token: checkToken.raw(),
      id: order.id
    }).error(function(){
      console.log('Błąd połączenia z bazą')
    })

  }

}]);


controllersAdmin.controller( 'userEdit' , [ '$scope' , '$http' , '$routeParams' , '$timeout', 'checkToken', function( $scope , $http , $routeParams, $timeout, checkToken ){

  var userId = $routeParams.id ; //do wyswietlania zdjec
  $scope.id = userId;

  $http.post( 'api/admin/users/get/' + userId, {
    token: checkToken.raw()
  } ).
  success( function( data ){
        $scope.user = data; // tak było jak nie było połączenia z bazą : $scope.product = products[productId];
  }).error( function(){
    console.log( 'Błąd komunikacji z bazą danych' );
  });
  

  $scope.saveChanges = function(user) {
   
    $http.post( 'api/admin/users/update/' ,  {

     user /*xyz*/ : user,                                              //nazwa parametru i wartość
       name : user.name,
      email: user.email,
      password: user.password,
      passconf: user.passconf,
      role: user.role,
      id: userId,
      token: checkToken.raw()


     }). //drugim parametrem metody post w nawiasie klamrowym sa dane które chcemy przesłać
    success(function( errors){
            $scope.submit = true;
      if(errors)
      {
        $scope.errors = errors;

      }
      else {
                $scope.complete = true;
               $scope.success = true;
               $timeout(function(){
               $scope.success = false;
              $scope.user = {};
                } , 3000);

          };
     
    }).error(function(){
      console.log('Błąd komunikacji z bazą')
    });

      
  };


   
}]);


controllersAdmin.controller( 'userCreate' , [ '$scope' , '$http', '$timeout', 'checkToken' , function( $scope , $http, $timeout, checkToken){

    $scope.user = {} ;
    $scope.user.role = 'user';

  $scope.createUser = function( user ) {


    $http.post('api/admin/users/create/' , {
      user : user,
      name : user.name,
      email: user.email,
      password: user.password,
      passconf: user.passconf,
      role: user.role,
      token: checkToken.raw()

    }).success(function(errors){

      $scope.submit = true;
      if(errors)
      {
        $scope.errors = errors;

      }
      else {
                $scope.complete = true;
               $scope.success = true;
               $timeout(function(){
               $scope.success = false;
              $scope.user = {};
                } , 3000);

          }
      }).error(function(){
        console.log('Błąd połączenia z bazą danych');

      
      
      });
    };
      
  }]);


	/* ogarnąć tą nową funkcję !!!!!!! $http({
  			method: 'GET',
  			url: 'model/produkty.json'
		}).then(function successCallback(response) {
			$scope.products=data;
    	// this callback will be called asynchronously
    	// when the response is available
  		}, function errorCallback(response) {
  			console.log( 'Błąd pobrania pliku json' );

    	// called asynchronously if an error occurs
    	// or server returns response with an error status.
  	}); */



	// console.log(  );
