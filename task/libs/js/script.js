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
                    $('#txtPopulation').hide();
                    $('#txtContinent').hide();
                    $('result').hide();
                    $('#txtCapital').show();
                }
            
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // your error code
            }
        }); 
    });

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

                    $('#txtPopulation').html(result['data'][0]['population']);  
                    $('#txtContinent').hide();
                    $('result').hide();
                    $('#txtCapital').hide();
                    $('#txtPopulation').show();
                }
            
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // your error code
            }
        }); 
    });

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
                    $('result').hide();
                    $('#txtCapital').hide();
                    $('#txtPopulation').hide();
                    $('#txtContinent').show();
                }
            
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // your error code
            }
        }); 
    });
});
