<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Products extends CI_Controller {

	public function __construct()
	{
		parent::__construct();

		$post = file_get_contents( 'php://input' );
		$_POST = json_decode( $post , true );	 

		$this->load->model('site/Products_model'); //doładowanie modelu przed updatem, czy deletem

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
public function getImages( $id ) {

		$basePath = FCPATH . '..' . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR ;
		$basePath = $basePath . $id . DIRECTORY_SEPARATOR ; 

		if (!is_dir( $basePath)){

			return ;
		}

		$files = scandir ($basePath); 
		$files = array_diff( $files, array( '.' , '..') ); // żeby sie ladniej prezentowało usuwamy z tablicy wiersze z kropkami
		$newFiles = array();       // to i pętla po to by wyzerowac indeks po usunieciu kropek, tworzymy nowa tablice gdzie wjezdżaja tylko pliki
		foreach ($files as $file)
		{
			$newFiles[] .= $file ;
			
		}
		/*echo '<pre>' ;
		var_dump ($newFiles) ; //var_dump to taki odpowiednik console_log, bo echo wyświetli binarnie ten obrazek i tablicy arrey tez nie wyswietli
		echo '</pre>'; */

		echo json_encode($newFiles); // jakby wyswietlic $files to beda miały klucze w przedeostku, bo nie od zera sa indeksy
	}

}

/* End of file Products.php */
/* Location: ./application/controllers/Products.php */