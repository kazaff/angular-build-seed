<?php
	
	$method = $_SERVER['REQUEST_METHOD'];
	
	if($method == 'GET'){
		
		if($uri[3] == 'menu'){
			$data = json_decode(urldecode($uri[4]));
			
			//主菜单所有权限都设置为1
			foreach($data as &$item){
				foreach($item->son as &$route){
					$route->status = 1;
				}
			}
			
			echo json_encode($data);
		
		}elseif($uri[3] == 'api'){
			echo 1;
		}
	
	}elseif($method == 'POST'){

		//接受到post提交的数据，格式为json
		$data = json_decode(file_get_contents("php://input"));
		$data = $data->menu[0];
		var_dump(mb_convert_encoding($data->title, 'gbk', 'utf-8'));
	}