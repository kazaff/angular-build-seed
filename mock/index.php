<?php
header('Content-Type: text/html; charset=gbk');

$uri = explode('/', $_SERVER['QUERY_STRING']);

require($uri[2].'.php');