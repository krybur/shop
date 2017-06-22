<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Users_model extends CI_Model {

	public function get( $id = false ) // false po to by domyslnie id nie było brane pod uwage
	{

		if ( $id == false )
		{
			$q = $this->db->get( 'users' );
			$q = $q->result();
		}
		else // ale jesli zostanie przekazane to:
		{
			$this->db->where( 'id' , $id ); // pierwsze id to w jakim polu szukamy w tabeli, jakby była nazwa to w nazwie by szukał, po przecinku czego szukamy (warunek: szukamy wartości przekazanej przez zmienną$id)
			$q = $this->db->get( 'users' );
			$q = $q->row(); // zwracamy już pojedynczy wiersz
		}

		return $q;
		
	}
	public function update($user) {

		$this->db->where('id' , $user['id']);
		$this->db->update('users', $user); // pobieramy rekord o id równym temu obiektowi i updateujemy tabele users produktem

	}
	public function create($user){

		$this->db->insert('users', $user);
	}
	public  function deleteUser($user)
	{
		$this->db->where('id' , $user['id']);
		$this->db->delete('users'); //no to juz nie trzeba dodawać produktu bo usuwa
	}

	public function get_unique( $id , $email )
	{
		$this->db->where( 'email' , $email );
		!$id || $this->db->where( 'id !=' , $id );
		$q = $this->db->get( 'users' );

		return $q->row();
	}

}

/* End of file  */
/* Location: ./application/models/ */