<?php

	$method = $_SERVER['REQUEST_METHOD'];
	
	if($method == 'GET'){
	    if($uri[3] == 'select'){
		     echo '[{"name":"aaaa","id":1},{"name":"bbbb","id":2},{"name":"ccccc","id":3},{"name":"ddddd","id":4}]';
		}elseif(isset($_GET['apiid'])) {		
			
			$item = new stdClass();
			$item->apiId = mt_rand(1, 1000);
			$item->apiAddr = '192.168.137.221/uiForWebOS/app/#!/app/692/api/add';
			$item->info = urlencode(mb_convert_encoding(str_repeat('api说明',mt_rand(1, 5)), 'utf-8', 'gbk'));
			$item->requestType = mt_rand(1, 4);
			$item->requestName = urlencode(mb_convert_encoding('请求类型'.mt_rand(1,999), 'utf-8', 'gbk'));				
			
			echo json_encode($item);
					
	    }
		else{
		//指定系统的所有api列表
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
					$item->apiId = mt_rand(1, 1000);
	     			$item->apiAddr = '192.168.137.221/uiForWebOS/app/#!/app/692/api/add';
					$item->info = urlencode(mb_convert_encoding(str_repeat('api说明',mt_rand(1, 5)), 'utf-8', 'gbk'));
					$item->requestType = mt_rand(1, 4);
					$item->requestName = urlencode(mb_convert_encoding('请求类型'.mt_rand(1,999), 'utf-8', 'gbk'));
					
					$result->items[] = $item;
				}
			}else{
				$result->hasMore = false;
			}
			
			echo json_encode($result);
		}
	}elseif($method == 'POST'){
	
		//接受到post提交的数据，格式为json
		//$data = json_decode(file_get_contents("php://input"));
	
					
			//更新指定应用系统
			sleep(1);
			echo '{"status": '.mt_rand(0, 1).'}';
	
	}elseif($method == 'PUT'){
	
		//$data = json_decode(file_get_contents("php://input"));
			
		sleep(1);
		echo '{"status":'.mt_rand(0, 1).'}';
	
	}elseif($method == 'DELETE'){
	
		//删除
		sleep(2);
		echo '{"status":1}';
	
	}