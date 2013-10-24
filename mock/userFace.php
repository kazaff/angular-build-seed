<?php
	
	include 'Http.php';
	
	$method = $_SERVER['REQUEST_METHOD'];
	if($method == 'POST'){
		$uploader = new Http();
		$uploader->fileUpload($_FILES['face']);
		
		$result = $uploader->getStatus();
		if($result['file']){
			$result['file'] = '../mock/'.$result['file'];
		}
		
		sleep(2);
		echo json_encode($result);
	}