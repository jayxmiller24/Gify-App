$(document).ready(function () {

    var animalArray = ["Hedgehog", "Dog", "cat", "bird"];
    var APIKey = "UcMkPFPr0ngVZvM6XF0YavXoZqDTKnEu"
   
    function displayAnimalInfo() {

        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&apikey=" + APIKey + "&limit=10";

        //Gets ajax content
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            //sets results to response.data
            var results = response.data;
            //console.log(results);
            //runs through array to append 10 photos to html
            for (var i = 0; i < results.length; i++) {

                var animalDiv = $("<div>");

                var rating = results[i].rating;
                var animatedSrc = results[i].images.fixed_height.url;
                var static = results[i].images.fixed_height_still.url;
                var showImage = $("<img>");
                var p = $("<p>").text("Rating: " + rating);

                showImage.attr("src", static);
                showImage.addClass("animalGiphy");
                showImage.attr("data-state", "still");
                showImage.attr("data-still", static);
                showImage.attr("data-animate", animatedSrc);
                animalDiv.append(p);
                animalDiv.append(showImage);
                $("#buttons-view").prepend(animalDiv);

            }
        });

    };


    $(document).on("click", ".animalGiphy", pausePlayGifs);
    //function to pause or play gifs on click
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

        //pushes new content to array
        animalArray.push(animals);

        
        renderButtons();
    });


 $(document).on("click", ".animal-btn", displayAnimalInfo);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();



});