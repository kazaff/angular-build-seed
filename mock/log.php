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
				
				//sleep(2);
				
				echo json_encode($result);
				
			}elseif($uri[5] == '0'){
				//所有用户
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
                  		$item->userid = mt_rand(1, 1000);
                  		$item->userName = urlencode(mb_convert_encoding('屌丝'.mt_rand(1,1000).'号', 'utf-8', 'gbk'));
                  		$item->dateTime = date('Y-m-d H:i:s', time() + $i * 1000);
                  		$item->ipv4 = '192.168.137.'.mt_rand(2, 254);
                  		$item->ipv6 = '';
                  		$item->status = mt_rand(0, 1).'';	//必须是字符串行，不然ng会有bug

                  		$result->items[] = $item;
                	}
             	}else{
                	$result->hasMore = false;
                }

                sleep(2);

                echo json_encode($result);
                
			}else{
				//指定用户
				
			}
			
		}elseif($uri[3] == 'action'){
			
			$uid = $uri[5];	//用户id
			
			$action = isset($_GET['action']) ? mb_convert_encoding($_GET['action'], 'gbk', 'utf-8') : '';	//获取搜索关键字
			
			$page = intval($uri[7]); //请求页码
			$preNum = 7;	//每页条数
			$maxNum = 18;	//总条数
				
			$maxPage = ceil($maxNum / $preNum);
			
			if($uid == '0'){
				//所有用户
				//所有用户
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
						$item->userid = mt_rand(1, 1000);
						$item->userName = urlencode(mb_convert_encoding('屌丝'.mt_rand(1,1000).'号', 'utf-8', 'gbk'));
						$item->action = urlencode(mb_convert_encoding($action.'操作'.mt_rand(1,1000), 'utf-8', 'gbk'));
						$item->dateTime = date('Y-m-d H:i:s', time() + $i * 1000);
						$item->ipv4 = '192.168.137.'.mt_rand(2, 254);
						$item->ipv6 = '';
						$item->info = urlencode(mb_convert_encoding(str_repeat('波拉波拉波拉波拉',mt_rand(1, 5)), 'utf-8', 'gbk'));;	//必须是字符串行，不然ng会有bug
				
						$result->items[] = $item;
					}
				}else{
					$result->hasMore = false;
				}
				
				sleep(2);
				
				echo json_encode($result);
				
			}else{
				//指定用户
				
			}		
		}
	}