<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class User_model extends CI_Model {

	public function get( $id ) {


			$this->db->where( 'id' , $id ); // pierwsze id to w jakim polu szukamy w tabeli, jakby była nazwa to w nazwie by szukał, po przecinku czego szukamy (warunek: szukamy wartości przekazanej przez zmienną$id)
			$q = $this->db->get( 'users' );
			$q = $q->row(); // zwracamy już pojedynczy wiersz
		

		return $q;
		
	}
	
	public function create ($user) {

		$this->db->insert('users', $user);
	}

	public function login($email, $password){

		$this->db->where('email', $email);
		$q=$this->db->get('users');
		$result = $q->row();
		$output = $result;
		
		if ( empty($result) || !hash_equals($result->password, $password) ) // jeśli nie ma takiego użytkownika o takim emailu lub email przesłany przez formularz dla użytkownika o takim mailu sie nie zgadza 
			{
				$output = false;
			}
		else
		{
			
			$output = $result ;
		}

			return $output ;
	}
}

/* End of file  */
/* Location: ./application/models/ */