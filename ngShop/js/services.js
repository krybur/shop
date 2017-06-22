'use strict';

var myServices = angular.module('myServices', [] );

myServices.factory ( 'cartSrv', [ 'store', function(store) {

	if(store.get('cartSrv'))

		var cartSrv = store.get('cartSrv');

	else

		var cartSrv=[] ;
  
  	cartSrv.show = function(){

    return cartSrv;

  };

  cartSrv.add = function ( product ) {

    
    var addNew = true;
    angular.forEach( cartSrv , function ( value , key ) {

      // TODO: wiadomo zmienić na id zamiast name jak bedzie baza

      if ( value.nazwa == product.nazwa )
      {
        addNew = false;
        cartSrv[key].qty++;
      }
    });

    if ( addNew )
    {
      cartSrv.push( product );
      product.qty = 1;
      
    }

    store.set( 'cartSrv' , cartSrv.show() );
    console.log(cartSrv);
  }



  cartSrv.clear = function() {
    store.remove('cartSrv');
    cartSrv.length = 0;
  }

  cartSrv.removeItem = function(newCart){

      store.set('cartSrv', newCart);
  }

cartSrv.update = function(newCart){

      store.set('cartSrv', newCart);
  }

return cartSrv ;

  
   
}] ) 



