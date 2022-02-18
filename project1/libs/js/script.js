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
    
  $('#selectCountry').on("click", function() {
      $.ajax({
          url: "libs/php/getAllCountries.php",
          type: 'POST',
          dataType: 'json',
          data: {
              country: $('name').val(),
          },
          success: function(result) {

              console.log(JSON.stringify(result));

               }
      });
  });
})

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
