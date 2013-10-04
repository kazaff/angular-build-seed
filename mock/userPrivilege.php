<?php
	$method = $_SERVER['REQUEST_METHOD'];
	
	if($method == 'GET'){
							
		if(isset($_GET['type']) && $_GET['type'] == 'onlyNode'){
			//用于树节点
			$result = array();
			for($i = 0; $i < 4; $i++){
				
				$item = new stdClass();
				$item->id = mt_rand(1, 999);
				$item->isParent = mt_rand(0, 1);
				//$tiem->name = $item->id.'号操作'.($item->isParent?'组':'');
				$item->name = $item->id;
				
				$result[] = $item;
			}	
			
			echo json_encode($result);
			
			sleep(1);
			exit;
		}
		
		$uid = $uri[3];

		//所有权限
		$page = intval($uri[4]); //请求页码
		$preNum = 7;	//每页条数
		$maxNum = 18;	//总条数
		
		$maxPage = ceil($maxNum / $preNum);


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
				$item->privId = mt_rand(1, 1000);
				$item->privName = urlencode(mb_convert_encoding('操作'.mt_rand(1,1000), 'utf-8', 'gbk'));
				$item->app = urlencode(mb_convert_encoding(mt_rand(1,1000).'号系统', 'utf-8', 'gbk'));
				$item->group = urlencode(mb_convert_encoding(mt_rand(1,1000).'组', 'utf-8', 'gbk'));
				$item->info = urlencode(mb_convert_encoding(str_repeat('波拉波拉波拉波拉',mt_rand(1, 5)), 'utf-8', 'gbk'));
				$item->validity = (bool)mt_rand(0, 1);
				$item->rule = mt_rand(0, 1);
				$item->begin = date('Y-m-d H:i:s', time()-1000000);
				$item->end = date('Y-m-d H:i:s', time()+1000000);
		
				$result->items[] = $item;
			}
		}else{
			$result->hasMore = false;
		}
		
		echo json_encode($result);
				
	}elseif($method == 'POST'){
		
		$data = json_decode(file_get_contents("php://input"));
		
		//处理单纯的状态修改， 包括：有效性，默认状态
		if(isset($_GET['opt']) && $_GET['opt'] == 'onlyStatus'){
			
			if($data->type == 'validity'){
				
				sleep(1);
				echo '{"status": '.mt_rand(0, 1).'}';
			
			}elseif($data->type == 'rule'){
				
				echo '{"status": '.mt_rand(0, 1).'}';
			}
						
			exit;
		}
		
		//新增用户权限规则
		
		/*
		if(isset($data->begin)){
			var_dump(time($data->begin));
		}
		*/
		
		echo '{"status": '.mt_rand(0, 1).'}';
	
	}elseif($method == 'PUT'){

		sleep(2);		
		echo '{"status":'.mt_rand(0, 1).'}';
		
	}elseif($method == 'DELETE'){
		
		//删除
		sleep(2);
		echo '{"status":'.mt_rand(0, 1).'}';
		
	}