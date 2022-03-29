//global variables

var border;
var currencyCode;
var countryName;
let capitalCityWeather;
let capitalCityLat;
let capitalCityLon;
let iso2CountryCode;
let capitalCity;
let visitedCountries = [];
let popup;
let issTracker = false;
let quakeMapper = false;

var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer.provider('Stamen.Terrain').addTo(map);

var Stamen_Terrain = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 0,
	ext: 'png'
});

// Select button
$(document).ready(function() {
    $.ajax({
        url: "libs/php/getAllCountries.php",
        type: 'GET',
        dataType: 'json',
        success: function(result) {
          if(result.status.name === "ok") {
            result.data.forEach(e => {
              $('#selectCountry').append($(`<option value = "${e.code}">${e.name}</option>`))
            });
          }
        }
      })
  });

//borders


$('#selectCountry').on('change', function() {
     let countryCode = $('#selectCountry').val();
     let countryOptionText = $('#selectCountry').find('option:selected').text();

     //check if new visited country is not already in the array and push it 
     if(!visitedCountries.includes(countryOptionText)) {
       visitedCountries.push(countryOptionText)
       console.log('Array visited countries', visitedCountries)
     }

    $.ajax({
        url: "libs/php/getCountryBorder.php",
        type: 'POST',
        dataType: 'json',
        success: function(result) {
          console.log('all borders result', result);

          if (map.hasLayer(border)) {
            map.removeLayer(border);
          }

          let countryArray = [];
          let countryOptionTextArray = [];

          for (let i = 0; i < result.data.border.features.length; i++) {
            if (result.data.border.features[i].properties.iso_a2 === countryCode) {
                countryArray.push(result.data.border.features[i]);
            }
        };
        for (let i = 0; i < result.data.border.features.length; i++) {
            if (result.data.border.features[i].properties.name === countryOptionText) {
                countryOptionTextArray.push(result.data.border.features[i]);
            }
        };

     
        border = L.geoJSON(countryOptionTextArray[0], {
                                                        color: 'lime',
                                                        weight: 3,
                                                        opacity: 0.75
                                                        }).addTo(map);
        let bounds = border.getBounds();
            map.flyToBounds(bounds, {
            padding: [35, 35], 
            duration: 2,
            });        
        },
        error: function(jqXHR, textStatus, errorThrown) {
          // your error code
          console.log(textStatus, errorThrown);
        }
    });

  });

      

//Country Modal
//Getting Country Modal
var modalCountry = document.getElementById("modalCountry");
//Getting Country Modal Btn
var countryBtn = document.getElementById("countryBtn");
//Get Close Country Modal
var closeBtn = document.getElementById("closeBtnCountry");
//Open Modal
countryBtn.onclick = function() {
    modalCountry.style.display = "block";
}
//Close Modal
closeBtn.onclick = function() {
    modalCountry.style.display = "none";
}
//Close Modal When User Clicks Outside
window.onclick = function(event) {
    if (event.target == modalCountry) {
      modalCountry.style.display = "none";
    }
  }
//fetching info from restCountries
  $('#btnRun').click(function() {
    $.ajax({
        url: "./php/restCountries.php",
        type: 'POST',
        dataType: 'json',
        data: {
            country: $('#selectCountry').val()   
        },
        success: function(result) {
          
            console.log('restCountries', result);
            if (result.status.name == "ok") {
                currencyCode = result.currency.code;
                capitalCityWeather= result.data.capital.toLowerCase();
                iso2CountryCode = result.data.alpha2Code;
                var countryName2 = result.data.name;
                countryName = countryName2.replace(/\s+/g, '_');
                
               
              //Geonames Country Info
              $.ajax({
                url: "libs/php/getCountryInfo.php",
                type: 'GET',
                dataType: 'json',
                data: {
                    geonamesInfo: iso2CountryCode,
                },
                success: function(result) {
                    console.log('Geonames Data', result);
                    if (result.status.name == "ok") {
                      $('#countryCapital').html('Capital: <strong>'+result.data[0].capital+ '</strong><br>');
                      $('#countryPopulation').html('Population: <strong>'+result.data[0].population+ '</strong><br>');
                      $('#countryAreaInSqKm').html('Area: <strong>'+result.data[0].areaInSqKm+ '</strong> km²<br>');
                      $('#countryContinent').html('Continent: <strong>'+result.data[0].continent+ '</strong><br>');
                      $('#countryLanguages').html('Languages: <strong>'+ result.data[0].languages + '</strong><br>');
                    }
                  },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }
              })

            }
          }
      });
    });
  

//Weather Modal
//Getting Weather Modal
var modalWeather = document.getElementById("modalWeather");
//Getting Weather Modal Btn
var weatherBtn = document.getElementById("weatherBtn");
//Get Close Weather Modal
var closeBtn = document.getElementById("closeBtnWeather");
//Open Modal
weatherBtn.onclick = function() {
    modalWeather.style.display = "block";
}
//Close Modal
closeBtn.onclick = function() {
    modalWeather.style.display = "none";
}
//Close Modal When User Clicks Outside
window.onclick = function(event) {
    if (event.target == modalWeather) {
      modalWeather.style.display = "none";
    }
}

