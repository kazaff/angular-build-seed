<?php
	
	include 'Http.php';
	
	$method = $_SERVER['REQUEST_METHOD'];
	if($method == 'POST'){
		$uploader = new Http();
		$uploader->fileUpload($_FILES['face']);

		echo json_encode($uploader->getStatus());
	}