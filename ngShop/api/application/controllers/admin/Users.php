<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Users extends CI_Controller {

	public function __construct()
	{
		parent::__construct();

		$post = file_get_contents( 'php://input' );
		$_POST = json_decode( $post , true );	 

		$this->load->model('admin/Users_model'); //doładowanie modelu przed updatem, czy deletem

		$token = $this->input->post('token');
		$token = $this->jwt->decode($token, config_item('encryption_key'));

		if ($token->role != 'admin')
			exit('nie jestes adminem');

		// ta funkcja construct działa tak, ze każdy kod umieszczony w konstruktorze, działa w każdej metodzie niżej w public function, np w każdej z metod niżej bedziemy potrzebowali konwersji danych wchodzących z angulara z jsona do posta. I z automatu działa to w każdej metodzie wywoływanej przez angular niżej \/ \/ \/ 
	}

	public function get( $id = false )
	{
		// $this->db->get( 'Users' ); to jednak idzie do folderu z modelami, tutak tylko ładujemy ten model
		 //pobieramy z bazy tabele Users, musi byc parametr bedacy nazwa tabeli, funkce codeignitera do obczajenia w specyfikacji
		//trzeba przyppisac to do zmiennej
		// i w autoload.php w konfiguracji codeign. dorzucamy database do autoloadu bibliotek

		
		$output = $this->Users_model->get($id);
		
		echo json_encode( $output);


	}

	public function update() 
	{
	$this->form_validation->set_error_delimiters ('' , ''); // chodzi o to, żeby codeigniter nie zamieniał znaków <> na nieinterpretowalne przez html &ht i &lt, bo tak tekst błędu pojaiwa sie tak <p>.....<p>, wpisz coś w '' a zobaczysz :D
		$this->form_validation->set_rules( 'name' , 'Imię', 'required|min_length[3]' );
		$this->form_validation->set_rules(  'email' , 'Email' , 'required|valid_email|callback_unique_email' ); //is_uniqe sprawdza czy w bazie w tabeli user w kolumnie email nie ma takiego maila
		$this->form_validation->set_rules( 'password' , 'Nowe hasło', 'required|matches[passconf]' );
		$this->form_validation->set_rules( 'passconf' , 'Powtóz nowe hasło', 'required|matches[password]' );

		if($this->form_validation->run() == true) {
			//biblioteka formValidation została załadowana w autoloadzie, ale można ją tutaj załadowac bezpośrednio
		$user = $this->input->post('user'); 
		$this->Users_model->update($user);
		}
		else
		{
			$errors['name'] = form_error('name');
			$errors['email'] = form_error('email');
			$errors['password'] = form_error('password');
			$errors['passconf'] = form_error('passconf');
			echo json_encode( $errors);
		}
		
	}

	public function create(){

		$this->form_validation->set_error_delimiters ('' , ''); // chodzi o to, żeby codeigniter nie zamieniał znaków <> na nieinterpretowalne przez html &ht i &lt, bo tak tekst błędu pojaiwa sie tak <p>.....<p>, wpisz coś w '' a zobaczysz :D
		$this->form_validation->set_rules( 'name' , 'Imię', 'required|min_length[3]' );
		$this->form_validation->set_rules( 'email' , 'Email', 'required|valid_email|is_unique[users.email]' ); //is_uniqe sprawdza czy w bazie w tabeli user w kolumnie email nie ma takiego maila
		$this->form_validation->set_rules( 'password' , 'Hasło', 'required|matches[passconf]' );
		$this->form_validation->set_rules( 'passconf' , 'Powtóz Hasło', 'required|matches[password]' );

		if($this->form_validation->run() == true) {
			//biblioteka formValidation została załadowana w autoloadzie, ale można ją tutaj załadowac bezpośrednio
		$user = $this->input->post('user'); 
		$user['password'] = crypt( $user['password'] , config_item( 'encryption_key' ) );
		$this->Users_model->create($user);
		}
		else
		{
			$errors['name'] = form_error('name');
			$errors['email'] = form_error('email');
			$errors['password'] = form_error('password');
			$errors['passconf'] = form_error('passconf');
			echo json_encode( $errors);
		}


	}

	public function deleteUser(){
		$user = $this->input->post('user'); 
		$this->Users_model->deleteUser($user);
	}

function unique_email()
	{
		$id = $this->input->post( 'id' );
		$email = $this->input->post( 'email' );

		if ( $this->Users_model->get_unique( $id , $email ) )
		{
			$this->form_validation->set_message( 'unique_email' , 'Inny użytkownik ma taki adres e-mail' );
			return false;
		}

		return true;
	}

}

/* End of file Users.php */
/* Location: ./application/controllers/Users.php */