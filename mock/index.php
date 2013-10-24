<?php
	date_default_timezone_set('Asia/Shanghai');
	
	header('Content-Type: text/html; charset=gbk');
	
	//用户认证
	$guest = false;
	if(isset($_SERVER['HTTP_AUTH'])){
		$authData = explode(' ', $_SERVER['HTTP_AUTH']);
		if($authData[0] == 'MD'){
			$sessionId = $authData[1];
		}else{
			$guest = true;
		}
	}elseif(isset($_GET['auth'])){
		$sessionId = $_GET['auth'];
	}else{
		$guest = true;
	}
	
	$uri = explode('/', $_SERVER['QUERY_STRING']);
	
	if($guest && $uri[2] != 'acl'){
		//未登录处理
		echo '{"loginStatus": 0}';
		exit;
	}
	
	$index = strpos($uri[2], '&');
	if($index){
		$file = substr($uri[2], 0, $index);
	}else{
		$file = $uri[2];
	}
	
	require($file.'.php');