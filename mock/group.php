<?php

	$method = $_SERVER['REQUEST_METHOD'];

	if($method == 'GET'){
			if(isset($_GET['type']) && $_GET['type'] == 'onlyNode'){
				//显示用户组树
				$result = array();
				for($i = 0; $i < 4; $i++){				
					$item = new stdClass();
					$item->id = mt_rand(1, 9);
					$item->isParent = mt_rand(0, 1);
					//$tiem->name = $item->id.'号操作'.($item->isParent?'组':'');
					$item->name = $item->id;	
					$item->checked = false;					
					$result[] = $item;
				}					
				echo json_encode($result);					
				sleep(1);				
			}elseif($uri[3] != 0){
				//显示指定用户的所属用户组列表
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
						$item->groupId = mt_rand(1, 1000);
						$item->name = urlencode(mb_convert_encoding('用户组'.mt_rand(1,999), 'utf-8', 'gbk'));
						$item->validity = (bool)mt_rand(0, 1);				
						$result->items[] = $item;
					}
				}else{
					$result->hasMore = false;
				}				
				echo json_encode($result);				
			}elseif($uri[3] == 0 && $uri[4] == 0 ){
				//显示系统中所有用户组列表				
				$page = intval($uri[5]); //请求页码
				$preNum = 7;	//每页条数
				$maxNum = 18;	//总条数					
				$maxPage = ceil($maxNum / $preNum);
				$action = isset($_GET['group']) ? mb_convert_encoding(urldecode($_GET['group']), 'gbk', 'utf-8') : '';	
				//获取搜索关键字					
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
						$item->groupId = mt_rand(1, 1000);
						$item->name = urlencode(mb_convert_encoding($action.'用户组'.mt_rand(1,999), 'utf-8', 'gbk'));
						$item->parentName = urlencode(mb_convert_encoding('父用户组'.mt_rand(1, 999), 'utf-8', 'gbk'));
						$item->parentId = mt_rand(1, 1000);
						$item->app = urlencode(mb_convert_encoding('应用系统'.mt_rand(1,999), 'utf-8', 'gbk'));
						
						$item->bindGroups =  array();
						for($j = 0;$j<3;$j++){
						$itemBind = new stdClass();
						$itemBind->id = mt_rand(1, 9);
						$itemBind->name = urlencode(mb_convert_encoding('绑定组'.$j, 'utf-8', 'gbk'));
						$item->bindGroups[]=$itemBind;
						}						
						
						$item->userCount = mt_rand(1, 9);
						$item->mobile = '13729837023';
						//$item->photo = '';	//后端用户头像如何暴露uri？
						$item->info = urlencode(mb_convert_encoding(str_repeat('不在不在不在不在不',mt_rand(1, 10)), 'utf-8', 'gbk'));
						$item->validity = (bool)mt_rand(0, 1);
				
						$result->items[] = $item;
					}
				}else{
					$result->hasMore = false;
				}
				
				echo json_encode($result); 
			
			}else{
				//获取指定的用户组信息
				mt_srand((double)microtime()*1000000);
						
				$item = new stdClass();
				$item->groupId = mt_rand(1, 1000);
				$item->name = urlencode(mb_convert_encoding('用户组'.mt_rand(1,999), 'utf-8', 'gbk'));
				$item->parentName = urlencode(mb_convert_encoding('父用户组'.mt_rand(1, 999), 'utf-8', 'gbk'));
				$item->app = urlencode(mb_convert_encoding('应用系统'.mt_rand(1,999), 'utf-8', 'gbk'));
				$item->bindGroups =  array();
				for($i = 0;$i<3;$i++){
					$itemBind = new stdClass();
					$itemBind->id = mt_rand(1, 9);
					$itemBind->name = urlencode(mb_convert_encoding('用户组'.$i, 'utf-8', 'gbk'));
					$item->bindGroups[]=$itemBind;
				}						
				$item->userCount = mt_rand(1, 9);	
				//$item->photo = '';	//后端用户头像如何暴露uri？
				$item->info = urlencode(mb_convert_encoding(str_repeat('不在不在不在不在不',mt_rand(1, 10)), 'utf-8', 'gbk'));
				$item->validity = (bool)mt_rand(0, 1);
				
				echo json_encode($item);
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