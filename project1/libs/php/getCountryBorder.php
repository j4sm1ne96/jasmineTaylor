<?php

$executionStartTime = microtime(true);

$countryBorders = json_decode(file_get_contents('countryBorders.geo.json'), true);

$border = null;

foreach ($countryBorders['feature'] as $feature {
  if($feature["properties"]["ISO_A3"] == $_REQUEST['countryCode']) {
    $border = $feature;
    break;
  }
}

$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
$output['data']['border'] = $border;
	
header('Content-Type: application/json; charset=UTF-8');

echo json_encode($output); 

?>
