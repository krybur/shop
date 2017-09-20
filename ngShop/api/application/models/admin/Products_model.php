<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Products_model extends CI_Model {

	public function get( $id = false ) // false po to by domyslnie id nie było brane pod uwage
	{

		if ( $id == false )
		{
			$q = $this->db->get( 'products' );
			$q = $q->result();
		}
		else // ale jesli zostanie przekazane to:
		{
			$this->db->where( 'id' , $id ); // pierwsze id to w jakim polu szukamy w tabeli, jakby była nazwa to w nazwie by szukał, po przecinku czego szukamy (warunek: szukamy wartości przekazanej przez zmienną$id)
			$q = $this->db->get( 'products' );
			$q = $q->row(); // zwracamy już pojedynczy wiersz
		}

		return $q;
		
	}
	public function update($product) {

		$this->db->where('id' , $product['id']);
		$this->db->update('products', $product); // pobieramy rekord o id równym temu obiektowi i updateujemy tabele products produktem

	}
	public function createProduct($product){

		$this->db->insert('products', $product);
	}
	public  function deleteProduct($product)
	{
		$this->db->where('id' , $product['id']);
		$this->db->delete('products'); //no to juz nie trzeba dodawać produktu bo usuwa
	}
		public function setThumb($productId , $product) {

		$this->db->where('id' , $productId);
		$this->db->update('products', $product); // pobieramy rekord o id równym temu obiektowi i updateujemy tabele products produktem

	}

}

/* End of file  */
/* Location: ./application/models/ */