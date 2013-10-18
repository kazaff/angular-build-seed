<?php
	date_default_timezone_set('Asia/Shanghai');
	
	header('Content-Type: text/html; charset=gbk');
	
	//用户认证
	if(isset($_SERVER['HTTP_AUTH'])){
		$authData = explode(' ', $_SERVER['HTTP_AUTH']);
		if($authData[0] == 'MD'){
			//$authData[1] 是会话id
		}
	}
	
	$uri = explode('/', $_SERVER['QUERY_STRING']);
	
	$index = strpos($uri[2], '&');
	if($index){
		$file = substr($uri[2], 0, $index);
	}else{
		$file = $uri[2];
	}
	
	require($file.'.php');