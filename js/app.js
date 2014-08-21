
$(document).ready(function() {

    /*--- Display information modal box ---*/
    $(".what").click(function(){
        $(".overlay").fadeIn(1000);

    });

    /*--- Hide information modal box ---*/
    $("a.close").click(function(){
        $(".overlay").fadeOut(1000);
    });

    //GETTING DATE FOR SEARCH (uses date.js library)
    var today = Date.today().toString("yyyyMMdd");
    var lastWeek = Date.today().addWeeks(-1).toString("yyyyMMdd");

    console.log("today is " + today);
    console.log("7 days before that was " + lastWeek);


    // THIS FUNCTION CALLS OUT TO THE NYT API, GETS DATA
    var findSearch = function(search){

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
            console.log(result.response["docs"].length);

            var articleCount = result.response["docs"].length;
            console.log(articleCount);
            $('#article-count').html("There have been " + articleCount + " articles mentioning zombies in the past 7 days.");
        })
        .fail(function(result) {
            console.log("error");
    }) 
    }; 

    findSearch();
});