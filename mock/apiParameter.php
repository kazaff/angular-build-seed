<?php

	$method = $_SERVER['REQUEST_METHOD'];
	
	if($method == 'GET'){
        if(isset($_GET['pid'])) {
		
			echo '{"type":true,"apiAddrValidity":true,"selected":{"name":"ccccc","id":3},"parameterEN":"asdf","parameterCN":"asdfsdfsdf斯蒂芬","apiAddr":"www.baidu.com","output":[{"isHidden":true,"pEN":"asdf","pCN":"斯蒂芬?"},{"isHidden":false,"pEN":"asdfdd","pCN":"斯蒂芬"}]}';
	    }		
		else{
		//指定系统的所有api列表
			$page = intval($uri[5]); //请求页码
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
					$item->parameterId = mt_rand(1, 1000);
					$item->parameterType = mt_rand(0, 1);
					$item->parameterCN = urlencode(mb_convert_encoding('参数'.mt_rand(1, 100), 'utf-8', 'gbk'));
					$item->parameterEN = 'parameter'.mt_rand(1,999);		
							
					$result->items[] = $item;
				}
			}else{
				$result->hasMore = false;
			}
			
			echo json_encode($result);
		}
	}elseif($method == 'POST'){
	
				
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