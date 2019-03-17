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



    // Function for displaying movie data
    function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < animalArray.length; i++) {

            // Then dynamicaly generating buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class of movie-btn to our button
            a.addClass("animal-btn");
            // Adding a data-attribute
            a.attr("data-name", animalArray[i]);
            // Providing the initial button text
            a.text(animalArray[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(a);
        }
    }

    // This function handles events where a movie button is clicked
    $("#add-animal").on("click", function (event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var animals = $("#animal-input").val().trim();

        // Adding movie from the textbox to our array
        animalArray.push(animals);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
    });


    $(document).on("click", ".animal-btn", displayMovieInfo);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();



});