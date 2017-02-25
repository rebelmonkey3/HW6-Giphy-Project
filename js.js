
	//object to hold array and the create buttons function.
var game = {

	stuffLiked: ["Video Games", "Paintball", "Hiking", "Zelda", 
	"Super Nintendo", "Dungeons & Dragons", "PC", "Recurve Bow", 
	"Star Wars", "Wheel of Time"],

	//  Pull from array and create buttons on the page

	makeButtons: function(){
		for(var i = 0; i < this.stuffLiked.length; i++)
		{
			var newDiv = $('<button class="btn btn-default" id="data-stuffLiked">');
			newDiv.text(this.stuffLiked[i]);
			$('body').append(newDiv);
		}
	}

}
	
	//Grab images from Giphy and dsiplay on page

$("button").on("click", function() {
	var stuffLiked = $(this).attr("data-stuffLiked");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
	stuffLiked + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
		url: queryURL,
		method: "GET"
	})
	.done(function(response) {
		var results = response.data;

		for (var i = 0; i < results.length; i++) {
			var gifDiv = $("<div>");

			var rating = results[i].rating;

			var p = $("<p>").text("Rating: " + rating);

			var sutffImg = $("<img>");
			sutffImg.attr("src", results[i].images.fixed_height.url);

			gifDiv.prepend(p);
			gifDiv.prepend(sutffImg);

			$("#gifs-appear-here").prepend(gifDiv);
			$('body').prepend(gifDiv)
		}
	});
});

		//Make Function to enter enrtry to add button

		$("#add-make").on("click", function(event) {
		
		event.preventDefault();
        
        var make = $("#make-input").val().trim();
        
        stuffLiked.prepend(make);
        	//prepend image, to add button to front of button list
        makeButtons();
   
    });




		//Funtion to pause/start GIF
		$(".gif").on("click", function() {
		var state = $(this).data("state")
		        if(state === "still"){
          var animsrc = $(this).data("animate");
          $(this).attr("src", animsrc);
          $(this).data("state", "animate")
        } 
        else{
          var animsrc = $(this).data("still");
          $(this).attr("src", animsrc);
          $(this).data("state", "still")
          // I pulled this code from our class work and changed it to fit how I thik it works. 
        	// The problem I ran into, was the Gifs we paused/started on our in class work were 
        		// provided for us and static,with 3 different images. The Gifs we are pulling (in theory)
        			// from Giphy will be in 1 state (animated) instead of the 2 different states of the class work.
        }
      });


game.makeButtons();

console.log(game.stuffLiked);

