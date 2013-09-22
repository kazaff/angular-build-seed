<?php

	$method = $_SERVER['REQUEST_METHOD'];
	
	if($method == 'GET'){
		if($uri[3] == 'login'){

			$page = $uri[7]; //请求页码
			$preNum = 7;	//每页条数
			$maxNum = 18;	//总条数
			
			$maxPage = ceil($maxNum / $preNum);
			
			if($uri[5] == 'myself'){
				//当前登录用户
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
						$item->dateTime = date('Y-m-d H:i:s', time() + $i * 1000);
						$item->ipv4 = '192.168.137.'.mt_rand(2, 254);
						$item->ipv6 = '';
						$item->status = mt_rand(0, 1).'';	//必须是字符串行，不然ng会有bug
					
						$result->items[] = $item;
					}	
				}else{
					$result->hasMore = false;
				}				
				
				sleep(3);
				
				echo json_encode($result);
				
			}elseif($uri[5] == '0'){
				//所有用户
				
			}else{
				//指定用户
				
			}
			
		}elseif($uri[3] == 'action'){
			
		}
	}