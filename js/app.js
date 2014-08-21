
$(document).ready(function() {
    $('.main').hide();
    
    // MODAL ABOUT POPUP
    $(".what").click(function(){
        $(".overlay").fadeIn(1000);
    });

    $("a.close").click(function(){
        $(".overlay").fadeOut(1000);
    });

    // RUNNING FUNCTION BASED ON TERM
    $(".launch").click(function (){
        searchArticles();
        $('.launch').fadeOut(50)
       // $('.launch').fadeTo(500, 0);
        $('.main').fadeIn(1000);

    });

    // GETTING DATE FOR SEARCH (uses date.js library)
    var today = Date.today().toString("yyyyMMdd");
    var lastWeek = Date.today().addWeeks(-1).toString("yyyyMMdd");

    console.log("today is " + today);
    console.log("7 days before that was " + lastWeek);


    // THIS FUNCTION CALLS OUT TO THE NYT API, GETS DATA
    var searchArticles = function(search){

        var request =   {tagged: search,
                        site: 'New York Times',
                        order: 'decs',
                        sort: 'creation'};

        var result = $.ajax({
            url: 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=zombie&begin_date=' + lastWeek + '&end_date=' + today + '&sort=newest&api-key=e2ccb8664b26fad01845f1c1549fb8ac:16:69681960',
            type: 'GET',
            dataType: 'json',
            data: search
        })
        .done(function(result) {
            console.log("success");
            console.log(result.response);

            var articleCount = result.response["docs"].length;
            console.log(articleCount);
            $('#article-count').html(articleCount);

        if (articleCount < 1) {
            var alertLevel = "black";
            $('#fear-alert').css("background-color", "#000");
            $('#fear-alert').text("something is wrong... RUN!");
            $('#instructions p').html("In this case, no news is the worst news. Forget everyone you ever knew and pray that you make it long enough to rebuild society.<br><br>Stop reading. Start running.");
        } else if (articleCount < 4) {
            var alertLevel = "green";
            $('#fear-alert').css("background-color", "#4DDB4D");
            $('#fear-alert').text("STAY CALM");
            $('#instructions p').html("There is no immenent threat. Continue to stockpile supplies and maintain a complete to-go bag in case of emergency. Now is the time to develop ways in which you can sustain yourself off of the grid.");
        } else if (articleCount < 7) {
            alertLevel = ["orange"];
            $('#fear-alert').css("background-color", "#FFA319");
            $('#fear-alert').text("USE CAUTION");
            $('#instructions p').html("The general public is not yet aware of the situation. Take advantage of any supplies still available in stores. If you're already in a rural area begin to build your defenses and gather all family members.<br><br> If you're in an urban area prepare to evacuate immediately.");
        } else if (articleCount >= 7) {
            var alertLevel = "red";
            $('#fear-alert').css("background-color", "#FF3333");
            $('#fear-alert').text("HIGH ALERT");
            $('#instructions p').html("The panic will begin soon. You must protect yourself from both the living and the dead moving forward. Be careful who you trust and stay hidden.<br><br>Start moving and don't ever stop.");
        };
        console.log("Alert Level: " + alertLevel);

        })
        .fail(function(result) {
            console.log("error");
        }) 

    }; 

    // DISPLAYING WARNING COLOR & INSTRUCTIONS
    //var showAlert = function(alertLevel) {};



});