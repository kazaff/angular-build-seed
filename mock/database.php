<?php
	$method = $_SERVER['REQUEST_METHOD'];
	if($method == 'GET'){
		
		if(isset($_GET['download']) && $_GET['download'] == 1){
			
			header('Content-Type: image/png');
			header('Content-Disposition: attachment; filename="downloaded.png"');
			echo file_get_contents('demo.png');
			exit;
		}
		
		//列表
		$page = $uri[3]; //请求页码
		$preNum = 7;	//每页条数
		$maxNum = 10;	//总条数
		$maxPage = ceil($maxNum / $preNum);
		
		if($page <= $maxPage){
			$result = new stdClass();
			$result->page = $page;
			$result->maxNum = $maxNum;
			$result->maxPage = $maxPage;
			
			$result->hasMore = true;
			
			$result->items = array();	
			for($i = 0; (($page - 1) * $preNum) < $maxNum && $i < min($preNum, $maxNum - ($page - 1) * $preNum); $i++){
				mt_srand((double)microtime()*1000000);
					
				$item = new stdClass();
				$item->dateTime = date('Y-m-d H:i:s', time() + $i * 1000);
				$item->size = mt_rand(0, 5).'MB';
					
				$result->items[] = $item;
			}
		}else{
			$result->hasMore = false;
		}
		
		sleep(1);
		
		echo json_encode($result);
		
	}elseif($method == 'PUT'){
		//备份
		sleep(2);		
		echo '{"status":'.mt_rand(0, 1).'}';
		
	}elseif($method == 'DELETE'){
		//删除
		sleep(1);
		echo '{"status":'.mt_rand(0, 1).'}';
		
	}elseif($method == 'POST'){
		//恢复
		sleep(3);
		echo '{"status":'.mt_rand(0, 1).'}';
	}