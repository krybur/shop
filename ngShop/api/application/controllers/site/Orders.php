<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Orders extends CI_Controller {

	public function __construct()
	{
		parent::__construct();

		$post = file_get_contents( 'php://input' );
		$_POST = json_decode( $post , true );	 

		$this->load->model('site/Orders_model'); //doładowanie modelu przed updatem, czy deletem

		$token = $this->input->post('token');
		$this->jwt->decode($token, config_item('encryption_key'));

		// ta funkcja construct działa tak, ze każdy kod umieszczony w konstruktorze, działa w każdej metodzie niżej w public function, np w każdej z metod niżej bedziemy potrzebowali konwersji danych wchodzących z angulara z jsona do posta. I z automatu działa to w każdej metodzie wywoływanej przez angular niżej \/ \/ \/ 
	}

	public function create()
	{
		$payload = $this->input->post('payload');
		unset($payload['role']); // odłączamy pole rola z tablicy, bo nie ma takiego pola w tabeli z zamówieniami
		$data = $payload;
		$items = $this->input->post('items');
		// i tak nie robi nam to JFO później więc nie :   $items = json_encode($items , JSON_FORCE_OBJECT); // JFO po to by nie kodowało do tablicy, tylko do obiektu jsona (tak to jest tabela z jsonem)
		$items = json_encode($items); // bez JFO, czyli będa w tablicy a nie obiekcie ale będzie parsowanie w kontrolerze
		$data['items'] = $items;
		$data['total'] = $this->input->post('total');
		$this->Orders_model->create( $data );
	}

	public function get(){

		$payload = $this->input->post('payload');
		$userId = $payload['userId'];
		
		$output = $this->Orders_model->get($userId);
		echo json_encode( $output);



	}

}

/* End of file Orders.php */
/* Location: ./application/controllers/Orders.php */