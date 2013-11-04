<?php
	$method = $_SERVER['REQUEST_METHOD'];
	
	if($method == 'GET'){
		
		if($uri[3] == 0){	
		
			//所有权限
			$page = intval($uri[4]); //请求页码
			$preNum = 7;	//每页条数
			$maxNum = 18;	//总条数
			
			$maxPage = ceil($maxNum / $preNum);
			
			$action = isset($_GET['privilege']) ? mb_convert_encoding(urldecode($_GET['privilege']), 'gbk', 'utf-8') : '';	//获取搜索关键字
			
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
					$item->privName = urlencode(mb_convert_encoding($action.'操作'.mt_rand(1,1000), 'utf-8', 'gbk'));
					$item->app = urlencode(mb_convert_encoding(mt_rand(1,1000).'号系统', 'utf-8', 'gbk'));
					$item->group = urlencode(mb_convert_encoding(mt_rand(1,1000).'组', 'utf-8', 'gbk'));
					$item->info = urlencode(mb_convert_encoding(str_repeat('波拉波拉波拉波拉',mt_rand(1, 5)), 'utf-8', 'gbk'));
					$item->validity = (bool)mt_rand(0, 1);
					$item->default = mt_rand(0, 1);
			
					$result->items[] = $item;
				}
			}else{
				$result->hasMore = false;
			}
			
			echo json_encode($result);
		
		}else{
		
			sleep(2);
			
			//获取指定权限
			$item = new stdClass();
			$item->privId = $uri[3];
			$item->privName = urlencode(mb_convert_encoding($uri[3].'操作'.mt_rand(1,1000), 'utf-8', 'gbk'));
			$item->app = urlencode(mb_convert_encoding(mt_rand(1,1000).'号系统', 'utf-8', 'gbk'));
			$item->group = urlencode(mb_convert_encoding(mt_rand(1,1000).'组', 'utf-8', 'gbk'));
			$item->info = urlencode(mb_convert_encoding(str_repeat('波拉波拉波拉波拉',mt_rand(1, 5)), 'utf-8', 'gbk'));
			$item->validity = (bool)mt_rand(0, 1);
			$item->default = mt_rand(0, 1);
			
			echo json_encode($item);
		}
				
	}elseif($method == 'POST'){
		
		$data = json_decode(file_get_contents("php://input"));
		
		//处理单纯的状态修改， 包括：有效性，默认状态
		if(isset($_GET['opt']) && $_GET['opt'] == 'onlyStatus'){	
						
				sleep(1);
				echo '{"status": '.mt_rand(0, 1).'}';								
			exit;
		}
		
		echo '{"status": '.mt_rand(0, 1).'}';
	
	}