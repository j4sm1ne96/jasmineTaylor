<?php

$json = file_get_contents('countryBorders.geo.json');

$decoded_json = json_decode($json, true);

L.geoJSON($decoded_json.geometry)

?>