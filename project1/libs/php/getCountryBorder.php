<?php

$json = file_get_contents('countryBorders.geo.json');

$decoded_json = json_decode($json, true);

$executionStartTime = microtime(true);

$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
$output['data']['border'] = $border;
	
header('Content-Type: application/json; charset=UTF-8');

echo json_encode($output); 

?>
