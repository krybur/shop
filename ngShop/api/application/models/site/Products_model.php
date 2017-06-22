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
	

}

/* End of file  */
/* Location: ./application/models/ */