<?php

	$method = $_SERVER['REQUEST_METHOD'];

	if($method == 'GET'){
		
	}elseif($method == 'POST'){

		if($uri[3] == 'self'){	//更新当前用户资料

			//接受到post提交的数据，格式为json
			$data = json_decode(file_get_contents("php://input"));
			
			$user = json_decode(urldecode($data->user));
			//var_dump(mb_convert_encoding($user->name, 'gbk', 'utf-8'));
			
			echo '{"status":1}';
		
		}elseif($uri[3] == 'selfPsw'){	//修改当前用户密码

			$data = json_decode(file_get_contents("php://input"));
			$psw = json_decode(urldecode($data->psw));
			//var_dump($psw->original);
			//var_dump($psw->fresh);
			
			echo '{"status": 1}';
		
		}elseif($uri[3] == 'selfAuth'){	//验证密码是否正确
			$data = json_decode(file_get_contents("php://input"));
			$psw = urldecode($data->psw);
			//var_dump($psw);
			
			echo '{"status": 1}';
		}
	}