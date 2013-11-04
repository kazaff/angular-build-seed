<?php

	$method = $_SERVER['REQUEST_METHOD'];

	if($method == 'GET'){
		
		if($uri[3] == 0){
			//所有用户
			$page = intval($uri[4]); //请求页码
			$preNum = 7;	//每页条数
			$maxNum = 18;	//总条数
			
			$maxPage = ceil($maxNum / $preNum);
			$action = isset($_GET['user']) ? mb_convert_encoding(urldecode($_GET['user']), 'gbk', 'utf-8') : '';	//获取搜索关键字
			
			$result = new stdClass();
			$result->page = $page;
			$result->maxNum = $maxNum;
			$result->maxPage = $maxPage;
			$result->items = array();
			if($page <= $maxPage){
					
				$result->hasMore = true;
					
				for($i = 0; (($page - 1) * $preNum) < $maxNum && $i < min($preNum, $maxNum - ($page - 1) * $preNum); $i++){
					mt_srand((double)microtime()*1000000);
						
					$item = new stdClass();
					$item->userId = mt_rand(1, 1000);
					$item->name = urlencode(mb_convert_encoding($action.'白富美'.mt_rand(1,999), 'utf-8', 'gbk'));
					$item->account = 'xxx'.mt_rand(1, 999);
					$item->idCard = '123456789012345';
					$item->sex = mt_rand(0, 1);
					$item->type = mt_rand(0, 1);
					$item->email = 'mail'.mt_rand(1, 999).'@163.com';
					$item->qq = '664566173';
					$item->phone = '0372-5980188';	
					$item->mobile = '13729837023';
					$item->photo = './img/default-face.png';
					$item->info = urlencode(mb_convert_encoding(str_repeat('流弊流弊流弊流弊',mt_rand(1, 10)), 'utf-8', 'gbk'));
					$item->validity = (bool)mt_rand(0, 1);
						
					$result->items[] = $item;
				}
			}else{
				$result->hasMore = false;
			}
				
			echo json_encode($result);
		
		}else{
			//指定用户
				
			$item = new stdClass();
			$item->userId = $uri[3];
			$item->name = urlencode(mb_convert_encoding('白富美'.$uri[3], 'utf-8', 'gbk'));
			$item->account = 'xxx'.mt_rand(1, 999);
			$item->idCard = '123456789012345';
			$item->sex = mt_rand(0, 1);
			$item->type = mt_rand(0, 1);
			$item->email = 'mail'.mt_rand(1, 999).'@163.com';
			$item->qq = '664566173';
			$item->phone = '0372-5980188';	
			$item->mobile = '13729837023';
			$item->photo = './img/default-face.png';
			$item->info = urlencode(mb_convert_encoding(str_repeat('流弊流弊流弊流弊',mt_rand(1, 10)), 'utf-8', 'gbk'));
			$item->validity = (bool)mt_rand(0, 1);
			
			echo json_encode($item);	
		}
		
	}elseif($method == 'POST'){

		//接受到post提交的数据，格式为json
		$data = json_decode(file_get_contents("php://input"));		
		
		//处理单纯的状态修改， 包括：有效性
		if($uri[3] == 'onlyStatus'){
		
			sleep(1);
			echo '{"status": '.mt_rand(0, 1).'}';

		}elseif($uri[3] == 'self'){	//更新当前用户资料

			//var_dump(mb_convert_encoding($data->info, 'gbk', 'utf-8'));
			
			sleep(1);
			echo '{"status":'.mt_rand(0, 1).'}';
		
		}elseif($uri[3] == 'selfPsw'){	//修改当前用户密码
		
			//var_dump($data->original);
			//var_dump($data->fresh);
			
			echo '{"status": 1}';
		
		}elseif($uri[3] == 'selfAuth'){	//验证密码是否正确

			$psw = urldecode($data->psw);
			//var_dump($psw);
			
			echo '{"status": 1}';
		
		}elseif($uri[3] == 'add'){
			//新增用户
			
			var_dump(mb_convert_encoding(urldecode($data->name), 'gbk', 'utf-8'));
			
			sleep(1);
			echo '{"status":'.mt_rand(0, 1).'}';
		
		}elseif($uri[3] == 'checkAccount'){
			//检查帐号是否存在
			
			sleep(2);
			echo '{"status":'.mt_rand(0, 1).'}';
		}
		
	}elseif($method == 'PUT'){
		
		if(isset($uri[3]) && $uri[3] == 'password'){
			//更改指定用户密码
			
			sleep(2);
			echo '{"status":'.mt_rand(0, 1).'}';
			
		}else{
			//更改指定用户信息
			
			//$data = json_decode(file_get_contents("php://input"));
			//var_dump(mb_convert_encoding(urldecode($data->name), 'gbk', 'utf-8'));
			
			sleep(2);
			echo '{"status":'.mt_rand(0, 1).'}';
		}
		
	}elseif($method == 'DELETE'){
		
		//删除
		sleep(2);
		echo '{"status":'.mt_rand(0, 1).'}';
		
	}