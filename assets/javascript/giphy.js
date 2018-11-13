
var btnTitles;
var newButton;
var newCategory;
var queryURL;
var gifSearch;
var results;
var rating;
var addGif;
var state;

btnTitles = ["Dog", "Cat", "Horse", "Elephant", "Trump"];

function makeButtons() {
	$("#buttons").html("");

	for (var i=0; i<btnTitles.length; i++) {
		newButton = $("<button>" + btnTitles[i] + "</button>");
		newButton.attr("data-name", btnTitles[i]);
		newButton.addClass("newButton");
		$("#buttons").append(newButton);
	};
};

$("#add-category").on("click", function(event){
	event.preventDefault();
	if ($("#user-input").val() !== ""){
		newCategory = $("#user-input").val();
		$("#user-input").val("");
		btnTitles.push(newCategory);
		makeButtons();
	}
});

$("#user-input").keypress(function(e){
	if (e.keyCode === 13 && $("#user-input").val() !== ""){
		newCategory = $("#user-input").val();
		$("#user-input").val("");
		btnTitles.push(newCategory);
		makeButtons();
	}
})

function displayGifs(){
	$("#gifs").html("");

	gifSearch = $(this).attr("data-name");
	queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifSearch + "&api_key=0UXPGmp79Mad762ua0oipD3ieysf0a9p&limit=5";
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		results = response.data;

		for(var i=0; i<results.length; i++){

			newDev = $("<div>");

			$("#gifs").append(newDev);

			rating = $("<div>Rating: " + results[i].rating + "</div>");

			addGif = $("<img data-state='still' src='" + results[i].images.fixed_height_still.url + "'>");
			addGif.attr("data-still", results[i].images.fixed_height_still.url);
			addGif.attr("data-animate", results[i].images.fixed_height.url);
			addGif.addClass("gif");

			newDev.append(rating);
			newDev.append(addGif);
		};
	});
};

function animateGif(){
	state = $(this).attr("data-state");

	if (state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	}
	else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
}

makeButtons();
$(document).on("click", ".newButton", displayGifs);
$(document).on("click", ".gif", animateGif);