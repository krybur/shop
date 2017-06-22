<?php
defined('BASEPATH') OR exit('No direct script access allowed');
//Ta klasa zawiera skopiwoany kod z części bacendowej ze skryptu do uploadu zdjec (z przeciągania) copy/paste z githuba
class Images extends CI_Controller {

	public function upload( $id ) // id bedzie przekazywane, bęzie służylo do robienia folderu dla zdjęcia/zdjęć
	{

		//echo path

		if ( !empty( $_FILES ) )
		{
		    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];

		    // $basePath zmienna która za pomoca FCPATH sama szuka sciezki, na localhoscie to proste bo wiemy jak nazywa sie folder c:\\ i tak dalej, ale na serwerze szuka sama np. login/user/ ... dobra rzecz

		    $basePath = FCPATH . '..' . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR; //directory_separator to bezpiczeny sposób wyświetlania sleszy / \ w zależnościod systemu sam sie dostsuje, a po to go używamy żebby wyjść wyżej do folderu upload ../upload , a sama kropka łączy w php
		    $basePath = $basePath . $id . DIRECTORY_SEPARATOR;
		    mkdir( $basePath , 0700 ); // mk dir tworzy folder bo go niema jeszcze dla id, jest tyko upload 0700 to chmode, zabezpieczenia odczytu i zapisu / ze studiów :) 

		    $uploadPath = $basePath . $_FILES[ 'file' ][ 'name' ]; // i tu uploadujemy do naszej ścieżki 

		    move_uploaded_file( $tempPath, $uploadPath ); // z tymczasowej do docelwoej, tez byo na studiach

		    $answer = array( 'answer' => 'File transfer completed' );

		    $json = json_encode( $answer );

		    echo $json;

		}
		else
		{
		    echo 'No files';
		}

	}

	public function get( $id ) {

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

	public function del () {
		$post = file_get_contents('php://input');
		$_POST = json_decode($post, true); //można zwrócić bez true jako obiekt, albo z true jako tablica
		
		// to powyżej służu do zdekodowania tego co przyszło ze strony w jsonie
		$id = $this->input->post('id'); //to funkcjonalność codeignitera, tak jest w PHP >> $_POST['id'], ale to nie jest chroniione 								 przez atakami swll injection
		$image = $this->input->post('image');

		$imagePath = FCPATH.'..'.DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR ;
		$imagePath = $imagePath . $id. DIRECTORY_SEPARATOR . $image ;

		unlink($imagePath);



	}

}

