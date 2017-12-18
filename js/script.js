// Display data in select option box
function DisplayData(message, dayName, pValue) {
    $("#responseMsg").html(message);

    $("#selectDays")
        .append($("<option></option>")
                .attr("value", pValue)
                .text(dayNumber));
}

// Access OpenWeather API
function RunAPI() {
    var weatherURL = 'api.openweathermap.org/data/2.5/forecast/daily?id=1975&appid=0a24d823e5f48003c6b67116f14c5541';

    $.getJSON(weatherURL)
        .done(function(data) {
            message = "I got the data!";
            if (data[0] !== 'undefined') {
                days = data.response.list;
                for (var i = 0; i < days.length; i++) {
                    var day = days[i];
                    var timeString = day.dt;
                    var date = new Date(timestring);
                    dayNumber = date.getDay();
                    dayName = ConvertDayNumtoName(dayNumber);
                    pValue = day.pressure;

                    DisplayData(message, dayName, pValue);
                }
            }
        })
        .fail(function(data) {
            message = "Error: No API response!";
        });
}

// Button to ajax into futurestay site
$("#sendToFS").click(function() {
    var pValue = $("#selectDays").find("option:selected").val();

    $.ajax({
        url : "http://www.futurestaybeta.com/test3.php",
        type: "POST",
        data : "value:"+pValue,
        success: function(response)
        {
            $("#FSMsg").html(response);
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            $("#FSMsg").html(textStatus);
        }
    });
});

// Helper functions

var DateNameDictionary = {1:"Monday", 2:"Tuesday", 3:"Wednesday", 4:"Thursday", 5:"Friday", 6:"Saturday", 7:"Sunday"};

function ConvertDayNumtoName(dayNumber) {
    return DateNameDictionary[dayNumber];
}