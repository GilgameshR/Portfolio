// refer to question 2 before development starts for scope document
// get URL query string
function getQueryStringValue(key) {
	return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}
// variable for the id
var id = getQueryStringValue("id");

if (id != "") {
	fetch('https://api.magicthegathering.io/v1/cards/' + id)
		.then(function(response) {

			response.json().then(function(data) {

				document.getElementById('cardDetails').innerHTML +=
					`<h2>${data.card.name}</h2>
					<p><b>About: </b>${data.card.text}</p>
					<p><b>Rarity: </b>${data.card.rarity}</p>
					<p><b>Colors: </b>${data.card.colors}</p>`;

				if (data.card.imageUrl === undefined) {
					document.getElementById('cardImage').innerHTML += `<img src="https://via.placeholder.com/223x310" width="100%">`;
				} else {
					document.getElementById('cardImage').innerHTML += `<img src="${data.card.imageUrl}" width="100%">`;
				}

			})
		})
} else {
	alert("I'm sorry, we couldn't find the card you're looking for. Please try again later")
}