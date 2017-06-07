$(document).ready(function(){

var wordExists;
var searchTerms=["Funny", "Basketball", "animals"];




$(document).on("click", ".buttonTopic", function(){
	$(".giphy").empty();
	var value= $(this).attr("data-value");

	var url= "https://api.giphy.com/v1/gifs/search?q=" + value + "&api_key=dc6zaTOxFJmzC";

	$.ajax({
		url: url, 
		method: "GET",
		data:{
			limit:10,
			rating: "r"
		}
	}).done(function(response){
		console.log(response);

	for(var i=0; i< response.data.length; i++){	

		//start off with still image
		var image= response.data[i].images.original_still.url;
		var giphy= $("<img src=" + image + ">");

		giphy.addClass("something");
		giphy.addClass("img-thumbnail");
		giphy.attr("id", i);
		giphy.attr("data-still", response.data[i].images.original_still.url);
		giphy.attr("data-animate", response.data[i].images.downsized_large.url);
		giphy.attr("data-state", "still");

		$(".giphy").append(giphy);
	}

	// $(".something").on("click", playPause());
	$(".something").on("click", function(){
	// function playPause(){	
	if($(this).attr("data-state")=="still"){
		// response.data[parseInt(this.attr("id"))].images.downsized_large.url
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	}
	else{
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");

	}
});
// }

	});

})



function displayButtons(){
	$(".buttonsHolder").empty();
	for(var i=0; i<searchTerms.length; i++){
		var button= $('<button>');
		button.addClass("buttonTopic");
		button.attr("data-value", searchTerms[i]);
		button.text(searchTerms[i]);
		$(".buttonsHolder").append(button);
	}
}


//pressing enter or submit
//use .submit()
$("#submit").on("click", function(event){

	wordExists=false;

	event.preventDefault();

	var inputText=$("#search").val();

	if(inputText==""){
		return false;
	}

	for(var i=0; i<searchTerms.length; i++){
		if(searchTerms[i]==inputText){
			//add user input to the searchTerms array
			wordExists=true;
		}
	}

	if(wordExists==false){
		searchTerms.push(inputText);
	}
	

	//clear the search box once a search is complete
	$("#search").val("");

	displayButtons();
})


displayButtons();

});
