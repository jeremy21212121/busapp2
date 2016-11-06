var errorz;

var leaveTime = new Object;
var countdown = new Object;
var busNum = new Object;
var nextTimes = new Object;
var destination = new Object;

var cats,results;
// $( document ).ready(function() {

var validateStopNumber = function(stop){
  if (stop < 1000) {
    console.log("Invalid bus stop number");
    // return;

  } else {
    console.log("Bus stop number seems valid");
  };

};

  $("button.go").click( function() {

    var stopNumber = $("input.stop-number").val();
    validateStopNumber(stopNumber);





        var url = "http://jsonp.afeld.me/?url=" + "http://api.translink.ca/rttiapi/v1/stops/" + stopNumber + "/estimates?apikey=EaD9UBkNYrKMCTRi3hzE&count=6&timeframe=180";
        // var url = "http://api.translink.ca/rttiapi/v1/stops/58290/estimates?apikey=EaD9UBkNYrKMCTRi3hzE&count=6&timeframe=180";

        cats =
        $.getJSON(url, function(data) {

          console.log(data);
          results = data;


          for (i=0; i<(results.length ); i++) {
            $("div.marker").before('<div class="schedule' + i + '"><p> The next #<span class="bus-num' + i + '"></span> bus to <span class="destination' + i + '"></span> will leave your stop in <span class="mins' + i + '"></span> minutes at <span class="time' + i + '"></span>. Also <span class="next-times' + i + '"></span>.</p></div>');

            leaveTime[i] = results[i].Schedules[0].ExpectedLeaveTime;
            if (leaveTime[i].length > 7) {
              leaveTime[i] = leaveTime[i].slice(0,7);
            }

            countdown[i] = results[i].Schedules[0].ExpectedCountdown;
            busNum[i] = parseInt( results[i].RouteNo, 10 );
            nextTimes[i]="";
              for (s=1; s<=3; s++) {
                nextTimes[i] += results[i].Schedules[s].ExpectedLeaveTime.slice(0,7) + " "
              };
            destination[i] = results[i].Schedules[0].Destination.toLocaleLowerCase() + " ";


            $("span.time"+i).text(leaveTime[i]);
            $("span.mins"+i).text(countdown[i]);
            $("span.bus-num"+i).text(busNum[i]);
            $("span.next-times"+i).text(nextTimes[i]);
            $("span.destination"+i).text(destination[i]);

          };



          })

          .done(function(){

            console.log("done");


          })

          .error(function(error){

            console.log(error.responseText);
            
          })




  });

// });
