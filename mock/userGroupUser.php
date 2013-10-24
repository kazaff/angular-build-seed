<?php

	$method = $_SERVER['REQUEST_METHOD'];

	if($method == 'GET'){

			if($uri[3] != 0){
				//显示指定用户组的所有用户列表
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
						$item->userID = mt_rand(1, 1000);
						
						$item->userName = urlencode(mb_convert_encoding('用户名'.mt_rand(1,999), 'utf-8', 'gbk'));
						$item->name = 'USERXXX'.mt_rand(1,999);
						$item->userCount = mt_rand(1,9);
						$item->validity = (bool)mt_rand(0, 1);				
						$result->items[] = $item;
					}
				}else{
					$result->hasMore = false;
				}
				
				echo json_encode($result);
				
			}		
	}elseif($method == 'POST'){

		//接受到post提交的数据，格式为json
		$data = json_decode(file_get_contents("php://input"));		
		
		//处理单纯的状态修改， 包括：有效性
		if($uri[3] == 'onlyStatus'){
		
			sleep(1);
			echo '{"status": '.mt_rand(0, 5).'}';
		}		
	}elseif($method == 'PUT'){

		sleep(1);		
		echo '{"status":'.mt_rand(0, 1).'}';
		
	}elseif($method == 'DELETE'){
		
		//删除
		sleep(2);
		echo '{"status":'.mt_rand(0, 1).'}';
		
	}