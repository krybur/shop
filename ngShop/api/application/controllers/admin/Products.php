<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Products extends CI_Controller {

	public function __construct()
	{
		parent::__construct();

		$post = file_get_contents( 'php://input' );
		$_POST = json_decode( $post , true );	 

		$this->load->model('admin/Products_model'); //doładowanie modelu przed updatem, czy deletem

		$token = $this->input->post('token');
		$token = $this->jwt->decode($token, config_item('encryption_key')); // zabezpieczenie przed haxami :)

		if ($token->role != 'admin')
			exit('nie jestes adminem');

		// ta funkcja construct działa tak, ze każdy kod umieszczony w konstruktorze, działa w każdej metodzie niżej w public function, np w każdej z metod niżej bedziemy potrzebowali konwersji danych wchodzących z angulara z jsona do posta. I z automatu działa to w każdej metodzie wywoływanej przez angular niżej \/ \/ \/ 
	}

	public function get( $id = false )
	{
		// $this->db->get( 'products' ); to jednak idzie do folderu z modelami, tutak tylko ładujemy ten model
		 //pobieramy z bazy tabele products, musi byc parametr bedacy nazwa tabeli, funkce codeignitera do obczajenia w specyfikacji
		//trzeba przyppisac to do zmiennej
		// i w autoload.php w konfiguracji codeign. dorzucamy database do autoloadu bibliotek

		
		$output = $this->Products_model->get($id);
		
		echo json_encode( $output);


	}

	public function update() 
	{
		$product = $this->input->post('product'); //ten product xyz
		$this->Products_model->update($product);
		
	}

	public function createProduct(){
		$product = $this->input->post('product'); 
		$this->Products_model->createProduct($product);

	}

	public function deleteProduct(){
		$product = $this->input->post('product'); 
		$this->Products_model->deleteProduct($product);
		$this->deleteDir( $product['id'] );
	}

		public function deleteDir( $id )
	{

		$dirPath = FCPATH . '../uploads/' . $id . '/';

	    if (substr($dirPath, strlen($dirPath) - 1, 1) != '/') {
	        $dirPath .= '/';
	    }
	    $files = glob($dirPath . '*', GLOB_MARK);
	    foreach ($files as $file) {
	        if (is_dir($file)) {
	            self::deleteDir($file);
	        } else {
	            unlink($file);
	        }
	    }
	    rmdir($dirPath);
	}



}

/* End of file Products.php */
/* Location: ./application/controllers/Products.php */