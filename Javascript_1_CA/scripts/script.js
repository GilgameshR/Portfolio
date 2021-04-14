fetch('https://api.magicthegathering.io/v1/cards')
	.then(function(response) {
		response.json().then(function(data) {

			createCards(data);
			document.getElementsByClassName("relative")[0].setAttribute("onsubmit", "return false;");
			document.getElementById('searchButton').addEventListener("click", function() {
				createCards(data);
			});
		})
	})


function createCards(cards) {
	// Wipes the entire "cards" element from the DOM
	document.getElementById("cards").remove(document.getElementById("col-sm-4"));

	var search = document.getElementById("search").value;
	var image;

	document.getElementsByClassName("row")[1].innerHTML += `<div class="col-sm12-" id="cards"></div>`;

	//Searches through the API comparing the card names with the users input.
	for (let i = 0; i < cards.cards.length; i++) {

		var str1 = cards.cards[i].name.toLowerCase();
		var str2 = search.toLowerCase();

		// Adds the cards to the DOM
		if (str1.includes(str2)) {
			var test = true;

			if (cards.cards[i].imageUrl === undefined) {
				image = "https://via.placeholder.com/223x310";
			} else {
				image = cards.cards[i].imageUrl;
			}

			document.getElementById("cards").innerHTML += `
															<div class="col-sm-4">
																<div class="card-container"> 
																	<h4>${cards.cards[i].name}</h4> 
																	<img src="${image}" width="100%"> 
																	<a href="card-specific.html?id=${cards.cards[i].id}" class="btn btn-success">View More</a> 
																</div> 
															</div>
															`;
		}
	}

	if (!test) {
		document.getElementById("cards").innerHTML += `<p style="color: red;">We could not find any results matching <b>"${search}"</b></p>`;
	}
}