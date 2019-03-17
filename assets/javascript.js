$(document).ready(function () {

    var animalArray = ["Hedgehog", "Dog", "cat", "bird"];
    var APIKey = "UcMkPFPr0ngVZvM6XF0YavXoZqDTKnEu"
   
    function displayMovieInfo() {

        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&apikey=" + APIKey + "&limit=10";


        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            var results = response.data;
            console.log(results);
            for (var i = 0; i < results.length; i++) {

                var animalDiv = $("<div class='col-md-4'>");

                var rating = results[i].rating;
                var defaultAnimatedSrc = results[i].images.fixed_height.url;
                var staticSrc = results[i].images.fixed_height_still.url;
                var showImage = $("<img>");
                var p = $("<p class='butn'>").text("Rating: " + rating);

                showImage.attr("src", staticSrc);
                showImage.addClass("animalGiphy");
                showImage.attr("data-state", "still");
                showImage.attr("data-still", staticSrc);
                showImage.attr("data-animate", defaultAnimatedSrc);
                animalDiv.append(p);
                animalDiv.append(showImage);
                $("#buttons-view").prepend(animalDiv);

            }
        });

    };


    $(document).on("click", ".animalGiphy", pausePlayGifs);

    //Function accesses "data-state" attribute and depending on status, changes image source to "data-animate" or "data-still"
    function pausePlayGifs() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }



    function renderButtons() {

        
        $("#buttons-view").empty();

        
        for (var i = 0; i < animalArray.length; i++) {

            
            var a = $("<button>");
            
            a.addClass("animal-btn");
            
            a.attr("data-name", animalArray[i]);
            a.text(animalArray[i]);
            
            $("#buttons-view").append(a);
        }
    }

    
    $("#add-animal").on("click", function (event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var animals = $("#animal-input").val().trim();

        
        animalArray.push(animals);

        
        renderButtons();
    });


    $(document).on("click", ".animal-btn", displayMovieInfo);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();



});