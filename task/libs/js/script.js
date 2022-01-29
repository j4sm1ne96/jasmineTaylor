$(document).ready(function() {
    $('#capitalBtn').on("click", function() {
        $.ajax({
            url: "libs/php/capitalInfo.php",
            type: 'POST',
            dataType: 'json',
            data: {
                country: $('#capCountry').val(),
            },
            success: function(result) {

                console.log(JSON.stringify(result));

                if (result.status.name == "ok") {

                    $('#txtCapital').html(result['data'][0]['capital']);  
                }
            
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // your error code
            }
        }); 
    });

});

$(document).ready(function() {
    $('#populationBtn').on("click", function() {
        $.ajax({
            url: "libs/php/populationInfo.php",
            type: 'POST',
            dataType: 'json',
            data: {
                country: $('#popCountry').val(),
            },
            success: function(result) {

                console.log(JSON.stringify(result));

                if (result.status.name == "ok") {

                    $('#txtCapital').html(result['data'][0]['population']);  
                }
            
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // your error code
            }
        }); 
    });
});

$(document).ready(function() {
    $('#continentBtn').on("click", function() {
        $.ajax({
            url: "libs/php/continentInfo.php",
            type: 'POST',
            dataType: 'json',
            data: {
                country: $('#capCountry').val(),
            },
            success: function(result) {

                console.log(JSON.stringify(result));

                if (result.status.name == "ok") {

                    $('#txtContinent').html(result['data'][0]['continent']);  
                }
            
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // your error code
            }
        }); 
    });
});
