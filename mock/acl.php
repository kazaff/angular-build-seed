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
		
		//登录
		//接受到post提交的数据，格式为json
		$data = json_decode(file_get_contents("php://input"));
		
		$item = new stdClass();
		$item->status = 1;
		$item->token = md5('kazaff');
		
		$item->userId = mt_rand(1, 1000);
		$item->name = urlencode(mb_convert_encoding('白富美'.mt_rand(1,999), 'utf-8', 'gbk'));
		$item->account = $data->account;
		$item->idCard = '123456789012345';
		$item->sex = mt_rand(0, 1);
		$item->type = mt_rand(0, 1);
		$item->email = 'mail'.mt_rand(1, 999).'@163.com';
		$item->qq = '664566173';
		$item->phone = '0372-5980188';
		$item->mobile = '13729837023';
		//$item->photo = '';	//后端用户头像如何暴露uri？
		$item->info = urlencode(mb_convert_encoding(str_repeat('流弊流弊流弊流弊',mt_rand(1, 10)), 'utf-8', 'gbk'));
		$item->validity = (bool)mt_rand(0, 1);
		
		
		sleep(3);
		echo json_encode($item);
	}