<?php

$json = file_get_contents('countryBorders.geo.json');

$decoded_json = json_decode($json, true);

$countries = [];

foreach($decoded_json['features'] as $country) {
    array_push($countries,
    (object)['code' => $country['properties']['iso_a2'], 'name' => $country['properties']['name']]);
}


$output['status']['code'] = '200';
$output['status']['name'] = 'ok';
$output['status']['description'] = 'success';
$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms ";
$output['data'] = $countries['name'];

header('Content-Type: application/json; charset=UTF-8');

echo json_encode($output);

?>


