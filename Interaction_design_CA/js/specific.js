function getQueryStringValue(key) {
	return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

var id = getQueryStringValue("id");

if (id != "") {

	fetch('http://api.gilgamesh.no/rest/shoes?apikey=5da057333cbe87164d4bb171&q=' + '{' + id + '}')
		.then(function(response) {

			response.json().then(function(data) {
				var cartObj = JSON.stringify(data[0]);
				document.getElementById("uniqueProducts").innerHTML +=
					`<div>
								<img src="${data[0].imageUrl}">
								<h2>${data[0].name}</h2>
								<p>${data[0].description}</p>
								<p>${"*".repeat(data[0].avgRating)}(${data[0].totalRating})</p>
						</div>
						<div id="productSpecs">
							<div>
								<div>
									<h2>Colour:</h2>
									<div id="colour">
										
									</div>
								</div>
								<div id="sizeContainer">
								<h2>Size:</h2>
								<div>
									<button class="filter" onclick="sizeFormat('EUsize')">EU sizes</button>
									<button class="filter" onclick="sizeFormat('UKsize')">UK sizes</button>
									<button class="filter" onclick="sizeFormat('USsize')">US sizes</button>
								</div>
								<div>
									<select name="Shoe size" id="shoeSize">
										<option value="" disabled selected hidden>Size</option>
									</select>
									</div
								</div>
								
							</div>
								<div>
									<h2>Quantity:</h2>
									<button id="qtySub" onClick='qtyAdjust("-")'>-</button>
									<input type="text" name="" id="quantity" value="1">
									<button id="qtyAdd" onClick='qtyAdjust("+")'>+</button>
								</div>
								<button id="buy" value="" onClick="addCart('${data[0]._id}')">Add to cart</button>
						</div>
						`;







				for (let i = 0; i < data[0].EUsize.length; i++) {
					document.getElementById("shoeSize").innerHTML +=
						`
							<option value='EUsize: ${data[0].EUsize[i]}' >${data[0].EUsize[i]}</option>
						`

				}
				for (let i = 0; i < data[0].EUsize.length; i++) {
					document.getElementById("shoeSize").innerHTML +=
						`
							<option value='UKsize: ${data[0].UKsize[i]}'" hidden="true">${data[0].UKsize[i]}</option>
						`
				}
				for (let i = 0; i < data[0].EUsize.length; i++) {
					document.getElementById("shoeSize").innerHTML +=
						`
								<option value='USsize: ${data[0].USsize[i]}' hidden="true">${data[0].USsize[i]}</option>
							`
				}
				for (let i = 0; i < data[0].colour.length; i++) {
					document.getElementById("colour").innerHTML +=
						`
						
							<input type="radio" class="colourPick" hidden id="${data[0].colour[i]}" name="colour" value='${data[0].colour[i]}'>
							<label for="${data[0].colour[i]}" style="background-color: ${data[0].colour[i]};">
					  	</label>
						`
				}
				document.getElementById(data[0].colour[0]).setAttribute("checked", true);
			})
		})
}

function sizeFormat(format) {

	for (let i = 0; i < document.getElementById("shoeSize").length; i++) {
		var sizeCheck = document.getElementById("shoeSize")[i].value;

		if (sizeCheck.includes(format)) {
			document.getElementById("shoeSize")[i].removeAttribute("hidden", true);
			document.getElementById("shoeSize")[i].setAttribute("visible", true);

		} else {
			document.getElementById("shoeSize")[i].removeAttribute("visible", true);
			document.getElementById("shoeSize")[i].setAttribute("hidden", true);
		}

	}
	if (format === "EUsize") {
		document.getElementsByClassName('filter')[0].style.background = "rgb(160, 160, 160)";
	} else {
		document.getElementsByClassName('filter')[0].style.background = "rgb(255, 255, 255)";
	}
	if (format === "UKsize") {
		document.getElementsByClassName('filter')[1].style.background = "rgb(160, 160, 160)";
	} else {
		document.getElementsByClassName('filter')[1].style.background = "rgb(255, 255, 255)";
	}
	if (format === "USsize") {
		document.getElementsByClassName('filter')[2].style.background = "rgb(160, 160, 160)";
	} else {
		document.getElementsByClassName('filter')[2].style.background = "rgb(255, 255, 255)";
	}

}

function addCart(cartContent) {
	var size = document.getElementById("shoeSize").value;
	var colourPick = document.getElementsByClassName("colourPick");
	var quantity = document.getElementById("quantity").value;


	for (let i = 0; i < colourPick.length; i++) {
		if (colourPick[i].checked) {
			var colour = colourPick[i].value;
			console.log(colour);
		}

	}

	fetch('http://api.gilgamesh.no/rest/shoes?apikey=5da057333cbe87164d4bb171&q=' + '{' + '"_id": ' + '"' + cartContent + '"' + '}')
		.then(function(response) {
			response.json().then(function(data) {


				var newItem = data;
				newItem[0].purchaseQuantity = quantity;
				newItem[0].purchaseSize = size;
				newItem[0].purchaseColour = colour

				var readValue = sessionStorage['cartContent'];

				try {
					readValue = JSON.parse(readValue);
					readValue[readValue.length] = newItem[0];
				} catch (error) {
					readValue = newItem;
					document.getElementById("counter").style.display = "block";
				}

				console.log(readValue)

				sessionStorage['cartContent'] = JSON.stringify(readValue);

				var retrievedObject = sessionStorage['cartContent'];
				document.getElementById("counter").innerText = JSON.parse(retrievedObject).length;

				location.reload();
			})
		})

}

function qtyAdjust(addSub) {

	if (document.getElementById("quantity").value === undefined || null) {
		console.log("Thats not a number");
	}
	if (addSub === "+") {
		document.getElementById("quantity").setAttribute("value", String(parseInt(document.getElementById("quantity").value) + 1));
	}
	if (addSub === "-" && document.getElementById("quantity").value != "0") {
		document.getElementById("quantity").setAttribute("value", String(parseInt(document.getElementById("quantity").value) - 1));
	}

}