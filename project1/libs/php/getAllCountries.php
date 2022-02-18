<?php

$json = file_get_contents('countryBorders.geo.json');

$decoded_json = json_decode($json, true);

$countries = [];

foreach($decoded_json['features'] as $country) {
    array_push($countries,
    (object)['code' => $country['properties']['iso_a2'], 'name' => $country['properties']['name']]);
}


return $countries;

?>

