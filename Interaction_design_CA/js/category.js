function getQueryStringValue(key) {
	return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

var id = getQueryStringValue("id");


if (id != "") {

	fetch('http://api.gilgamesh.no/rest/shoes?apikey=5da057333cbe87164d4bb171&q=' + '{' + id + '}' + '&dir=1&max=15')
		.then(function(response) {

			response.json().then(function(data) {
				if (id.includes("Boots")) {
					var bannerType = "boots_banner.png";
					var bannerHeader = "Boots";
				}
				if (id.includes("Formal")) {
					var bannerType = "formal_banner.png";
					var bannerHeader = "Formal";
				}
				if (id.includes("Casual")) {
					var bannerType = "casual_banner.png";
					var bannerHeader = "Casual";
				}
				document.getElementById("banner").innerHTML +=
					`
					<h1>${bannerHeader}</h1>
					
					`;
				document.getElementById("banner").style.backgroundImage = "url('../assets/" + bannerType + "')";

				for (let i = 0; i < data.length; i++) {

					document.getElementById("products").innerHTML +=
						`
						<div>
						<a href='product.html?id="productId": ${data[i].productId}'>
						<img src='${data[i].imageUrl}'>
						<h2>${data[i].name}</h2>
						<p>$${data[i].price}</p>
						<p>${starRating.repeat(data[i].avgRating)} (${data[i].totalRating})</p>
						</a>
						</div>
					`;
				}
			})
		})
}
var starRating = '<img src="../assets/Asset3.svg" alt="Star rating"  id="starRating">';

function sizeFormat(format) {

	var sizeList = document.getElementById("size");
	while (sizeList.hasChildNodes()) {
		sizeList.removeChild(sizeList.childNodes[0]);
	}

	if (format === "eu") {
		document.getElementById("size").innerHTML +=
			`
			<li><label><input type="checkbox" value='"EUsize": ' id="">38</label></li>
			<li><label><input type="checkbox" value='"EUsize": ' id="">39</label></li>
			<li><label><input type="checkbox" value='"EUsize": ' id="">40</label></li>
			<li><label><input type="checkbox" value='"EUsize": ' id="">41</label></li>
			<li><label><input type="checkbox" value='"EUsize": ' id="">42</label></li>
			<li><label><input type="checkbox" value='"EUsize": ' id="">43</label></li>
			<li><label><input type="checkbox" value='"EUsize": ' id="">44</label></li>
			<li><label><input type="checkbox" value='"EUsize": ' id="">45</label></li>
			<li><label><input type="checkbox" value='"EUsize": ' id="">46</label></li>
			`
		document.getElementsByClassName('filter')[15].style.background = "rgb(160, 160, 160)";
		document.getElementsByClassName('filter')[16].style.background = "rgb(255, 255, 255)";
		document.getElementsByClassName('filter')[17].style.background = "rgb(255, 255, 255)";
	}
	if (format === "uk") {
		document.getElementById("size").innerHTML +=
			`
			<li><label><input type="checkbox" value='"UKsize": 5' id="">5</label></li>
			<li><label><input type="checkbox" value='"UKsize": 5.5' id="">5.5</label></li>
			<li><label><input type="checkbox" value='"UKsize": 6' id="">6</label></li>
			<li><label><input type="checkbox" value='"UKsize": 6.5' id="">6.5</label></li>
			<li><label><input type="checkbox" value='"UKsize": 7' id="">7</label></li>
			<li><label><input type="checkbox" value='"UKsize": 7.5' id="">7.5</label></li>
			<li><label><input type="checkbox" value='"UKsize": 8' id="">8</label></li>
			<li><label><input type="checkbox" value='"UKsize": 8.5' id="">8.5</label></li>
			<li><label><input type="checkbox" value='"UKsize": 9' id="">9</label></li>
			<li><label><input type="checkbox" value='"UKsize": 9.5' id="">9.5</label></li>
			<li><label><input type="checkbox" value='"UKsize": 10' id="">10</label></li>
			<li><label><input type="checkbox" value='"UKsize": 10.5' id="">10.5</label></li>
			<li><label><input type="checkbox" value='"UKsize": 11' id="">11</label></li>
			<li><label><input type="checkbox" value='"UKsize": 11.5' id="">11.5</label></li>
			<li><label><input type="checkbox" value='"UKsize": 12' id="">12</label></li>
			`
		document.getElementsByClassName('filter')[15].style.background = "rgb(255, 255, 255)";
		document.getElementsByClassName('filter')[16].style.background = "rgb(160, 160, 160)";
		document.getElementsByClassName('filter')[17].style.background = "rgb(255, 255, 255)";
	}


	if (format === "us") {
		document.getElementById("size").innerHTML +=
			`
			<li><label><input type="checkbox" value='"USsize": 5.5' id="">5.5</label></li>
			<li><label><input type="checkbox" value='"USsize": 6' id="">6</label></li>
			<li><label><input type="checkbox" value='"USsize": 6.5' id="">6.5</label></li>
			<li><label><input type="checkbox" value='"USsize": 7' id="">7</label></li>
			<li><label><input type="checkbox" value='"USsize": 7.5' id="">7.5</label></li>
			<li><label><input type="checkbox" value='"USsize": 8' id="">8</label></li>
			<li><label><input type="checkbox" value='"USsize": 8.5' id="">8.5</label></li>
			<li><label><input type="checkbox" value='"USsize": 9' id="">9</label></li>
			<li><label><input type="checkbox" value='"USsize": 9.5' id="">9.5</label></li>
			<li><label><input type="checkbox" value='"USsize": 10' id="">10</label></li>
			<li><label><input type="checkbox" value='"USsize": 10.5' id="">10.5</label></li>
			<li><label><input type="checkbox" value='"USsize": 11' id="">11</label></li>
			<li><label><input type="checkbox" value='"USsize": 11.5' id="">11.5</label></li>
			<li><label><input type="checkbox" value='"USsize": 12' id="">12</label></li>
			<li><label><input type="checkbox" value='"USsize": >12.5' id="">12.5</label></li>
			`
		document.getElementsByClassName('filter')[15].style.background = "rgb(255, 255, 255)";
		document.getElementsByClassName('filter')[16].style.background = "rgb(255, 255, 255)";
		document.getElementsByClassName('filter')[17].style.background = "rgb(160, 160, 160)";
	}

}

function filtering() {
	var inputArray = document.getElementsByClassName('filter');
	var sortArray = document.getElementById('sort');
	var productList = document.getElementById("products");
	var filterList;
	var sortValue;



	for (let i = 0; i < inputArray.length; i++) {
		if (inputArray[i].checked && filterList != undefined) {
			filterList = filterList + ", " + inputArray[i].value;
		}
		if (inputArray[i].checked && filterList === undefined) {
			filterList = inputArray[i].value;
		}
	}
	if (filterList === undefined) {
		filterList = '{' + id + '}';
	}

	if (window.innerWidth < 1025) {

		if (document.getElementById('highest').checked === true) {
			sortArray = document.getElementById('highest');
		}
		if (document.getElementById('lowest').checked === true) {
			sortArray = document.getElementById('lowest');
		}
		if (document.getElementById('reviews').checked === true) {
			sortArray = document.getElementById('reviews');
		}
		if (document.getElementById('rating').checked === true) {
			sortArray = document.getElementById('rating');
		}
	}


	if (sortArray.value != undefined) {
		sortValue = sortArray.value;
	}
	var filterQuery = sortValue + '&q={"$and": [' + filterList + ']}';
	return filterQuery;
}

var filterUpdate = debounce(function() {

	var filterQuery = filtering();
	var productList = document.getElementById("products")

	while (productList.hasChildNodes()) {
		productList.removeChild(productList.childNodes[0]);
	}


	fetch('http://api.gilgamesh.no/rest/shoes?apikey=5da057333cbe87164d4bb171' + filterQuery + '&max=15')
		.then(function(response) {

			response.json().then(function(data) {

				for (let i = 0; i < data.length; i++) {

					document.getElementById("products").innerHTML +=
						`
						<div>
						<a href='product.html?id="productId": ${data[i].productId}'>
						<img src='${data[i].imageUrl}'>
						<h2>${data[i].name}</h2>
						<p>$${data[i].price}</p>
						<p>${"*".repeat(data[i].avgRating)}(${data[i].totalRating})</p>
						</a>
						</div>
					`;
				}
			})
		})

}, 1000);


var slowDown = debounce(function() {

	if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 150) {

		var currentCount = document.getElementById("products").childElementCount;
		var filterQuery = filtering();

		fetch('http://api.gilgamesh.no/rest/shoes?apikey=5da057333cbe87164d4bb171' + filterQuery + '&dir=1&skip=' + currentCount + '&max=' + 15)
			.then(function(response) {

				response.json().then(function(data) {

					for (let i = 0; i < data.length; i++) {

						document.getElementById("products").innerHTML +=
							`
						<div>
						<a href='product.html?id="productId": ${data[i].productId}'>
						<img src='${data[i].imageUrl}'>
						<h2>${data[i].name}</h2>
						<p>$${data[i].price}</p>
						<p>${"*".repeat(data[i].avgRating)}(${data[i].totalRating})</p>
						</a>
						</div>
					`;
					}
				})
			})
	}

}, 500);

window.addEventListener('scroll', slowDown);


function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this,
			args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	}
}

function filterDropdown() {

	for (let i = 0; i < document.getElementById('navbar').childElementCount - 1; i++) {
		if (document.getElementsByClassName('filterDropdown')[i].style.display != "block") {
			document.getElementsByClassName('filterDropdown')[i].style.display = "block";
		} else {
			document.getElementsByClassName('filterDropdown')[i].style.display = "none";
		}
	}
}

function specificFilter(target) {

	if (window.innerWidth < 1025) {

		if (target === 'sort') {

			if (document.getElementsByClassName(target)[1].style.display != "block") {
				document.getElementsByClassName(target)[1].style.display = "block";
			} else {
				document.getElementsByClassName(target)[1].style.display = "none";
			}
		} else {

			if (document.getElementsByClassName(target)[0].style.display != "block") {
				document.getElementsByClassName(target)[0].style.display = "block";
			} else {
				document.getElementsByClassName(target)[0].style.display = "none";
			}
		}

	}
}

window.addEventListener('resize', sizeEvent)


function sizeEvent() {
	if (window.innerWidth > 1025) {
		document.getElementsByClassName('sort')[0].style.display = "block";
		document.getElementsByClassName('sort')[1].style.display = "none";
	} else {
		document.getElementsByClassName('sort')[0].style.display = "none";
		document.getElementsByClassName('sort')[1].style.display = "block";
	}
}
sizeEvent();