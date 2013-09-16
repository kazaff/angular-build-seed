<?php

	$method = $_SERVER['REQUEST_METHOD'];

	if($method == 'GET'){
		
	}elseif($method == 'POST'){

		if($uri[3] == 'self'){

			//接受到post提交的数据，格式为json
			$data = json_decode(file_get_contents("php://input"));
			
			$user = json_decode(urldecode($data->user));
			//var_dump(mb_convert_encoding($user->name, 'gbk', 'utf-8'));
			
			echo '{"status":1}';
		}
	}