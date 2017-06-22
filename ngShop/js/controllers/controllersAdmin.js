'use strict';

var controllersAdmin = angular.module('controllersAdmin' , ['angularFileUpload', 'myDirectives']);

controllersAdmin.controller( 'products' , [ '$scope' , '$http' , function( $scope , $http){

  $http.get( 'api/admin/products/get/' ). // opuszczamy application i controllers bo chyba domyslnie to przenosi, ostatnie to funkcja zapisana w kontrolerze
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
      product:product
    }).error( function(){
      console.log('Produk nie został usunięty z bazy - błąd komunikacji api')
    })
      };

     
}]);

controllersAdmin.controller( 'productEdit' , [ '$scope' , '$http' , '$routeParams' , 'FileUploader' , '$timeout' , function( $scope , $http , $routeParams, FileUploader, $timeout ){

  var productId = $routeParams.id ; //do wyswietlania zdjec
  $scope.id = productId;

  $http.get( 'api/admin/products/get/' + productId ).
  success( function( data ){
    
    $scope.product = data; // tak było jak nie było połączenia z bazą : $scope.product = products[productId];
  }).error( function(){
    console.log( 'Błąd pobrania pliku json' );
  });

  function getImages() {
  $http.get( 'api/admin/images/get/' + productId).
  success( function( data ){
    $scope.images = data;
  }).error( function(){
    console.log( 'Błąd pobrania pliku json' );
  });

  } 
  getImages(); // ta część jest w funkcji, która teraz wywołujemy, żeby działał, poniewaz chcemy, zeby obrazki pojawiały sie zaraz po wstawieniu. 

  $scope.saveChanges = function(product) {
                                                //nazwa parametru i wartość
    $http.post( 'api/admin/products/update/' ,  { product /*xyz*/ : product} ). //drugim parametrem metody post w nawiasie klamrowym sa dane które chcemy przesłać
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
      image: imageName

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

controllersAdmin.controller( 'productCreate' , [ '$scope' , '$http', '$timeout' , function( $scope , $http, $timeout){



  $scope.createProduct = function(product) {
    $http.post( 'api/admin/products/createProduct/' ,  { product /*xyz*/ : product} ). 
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
}]);

controllersAdmin.controller( 'users' , [ '$scope' , '$http' , function( $scope , $http ){

  $http.get( 'api/admin/users/get' ). // opuszczamy application i controllers bo chyba domyslnie to przenosi, ostatnie to funkcja zapisana w kontrolerze
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
      user : user
    }).error( function(){
      console.log('Użytkownik nie został usunięty z bazy - błąd komunikacji api')
    })
      };

     
}]);



controllersAdmin.controller( 'orders' , [ '$scope' , '$http' , function( $scope , $http ){

  $http.get( 'model/orders.json' ).
  success( function( data ){
    $scope.orders = data;
  }).error( function(){
    console.log( 'Błąd pobrania pliku json' );
  });

   $scope.delete = function(order, $index){
    //przeslac dane przez api
    console.log($scope.orders[$index]);
    $scope.orders.splice( $index, 1 ); //(ktory indeks zaczyna, ile elementow usunac, ewentualnie dodac)
      };

  $scope.changeStatus = function(order) {
    if(order.status == 0){
      order.status = 1;
    }
    else{
      order.status = 0;
    }
    // TODO : oczywiście trzeba to wysłać do bazy

  }

}]);


controllersAdmin.controller( 'userEdit' , [ '$scope' , '$http' , '$routeParams' , '$timeout', function( $scope , $http , $routeParams, $timeout ){

  var userId = $routeParams.id ; //do wyswietlania zdjec
  $scope.id = userId;

  $http.get( 'api/admin/users/get/' + userId ).
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
      id: userId


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


controllersAdmin.controller( 'userCreate' , [ '$scope' , '$http', '$timeout' , function( $scope , $http, $timeout){

    $scope.user = {} ;
    $scope.user.role = 'user';

  $scope.createUser = function( user ) {


    $http.post('api/admin/users/create/' , {
      user : user,
      name : user.name,
      email: user.email,
      password: user.password,
      passconf: user.passconf,
      role: user.role

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
