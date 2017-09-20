<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Orders_model extends CI_Model {

	// public function get( $id )
	// {

	// 	$this->db->where( 'id' , $id );
	// 	$q = $this->db->get( 'users' );
	// 	$q = $q->row();

	// 	return $q;

	// }

	public function create( $data )
	{
		$this->db->insert( 'orders' , $data );
	}

	public function get($userId)
	{
		$this->db->where( 'userId' , $userId);
		$q = $this->db->get('orders');
		$q = $q->result(); // result, a nie row, bo nei tylko jeden wpis w tabeli, tylko wszystkie, bo jeden użytkownik, może imeć więcej zamówień
		return $q;
	}

}

/* End of file  */
/* Location: ./application/models/ */