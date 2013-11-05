<?php
	$method = $_SERVER['REQUEST_METHOD'];
	
	if($method == 'GET'){
		$result = array();
		
		for($i = 0; $i < 10; $i++){
			mt_srand((double)microtime()*1000000);
				
			$item = new stdClass();
			$item->id = mt_rand(1, 1000);
			$item->name = urlencode(mb_convert_encoding('ϵͳ'.mt_rand(1,999), 'utf-8', 'gbk'));
			$item->logo = './img/app-logo-default.png';
			$item->domain = 'http://www.codingcool.com';
			$item->sign = md5('kazaff');
			
			$result[] = $item;
		}
		
		echo json_encode($result);
	}