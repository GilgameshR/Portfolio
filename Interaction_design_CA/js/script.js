if (document.getElementById('logo')) {
    fetch(
        'http://api.gilgamesh.no/rest/shoes?apikey=5da057333cbe87164d4bb171&sort=_id&dir=-1&max=4'
    ).then(function(response) {
        response.json().then(function(data) {
            products(data)
        })
    })
}

function products(prodList) {
    for (let i = 0; i < prodList.length; i++) {
        document.getElementById('arrivals').innerHTML += `
			<div>
				<div>
					<a href='html/product.html?id="productId": ${prodList[i].productId}'>
						<img src="${prodList[i].imageUrl}">
					</a>
				</div>
				<div>
					<a href='html/product.html?id="productId": ${prodList[i].productId}'>
						<h2>${prodList[i].name}</h2>
						<p>$${prodList[i].price}</p>
						<p>${'*'.repeat(prodList[i].avgRating)}(${prodList[i].totalRating})</p>
					</a>
				</div>
			</div>
			`
    }
}

initialScroll = window.scrollY
window.onscroll = function thingy() {
    currentScroll = window.scrollY

    if (
        currentScroll > initialScroll &&
        document.getElementById('cartWindow').style.display != 'block'
    ) {
        document.getElementById('header').style.top = '-60px'
    } else {
        document.getElementById('header').style.top = '0'
    }
    initialScroll = currentScroll
}

function hamburger() {
    for (let i = 0; i < 4; i++) {
        if (
            document.getElementsByClassName('menuItem')[i].style.display !=
            'block'
        ) {
            document.getElementsByClassName('menuItem')[i].style.display =
                'block'
            document.getElementById('header').style.height = '100vh'
            document.getElementById('header').style.display = 'block'
        } else {
            document.getElementsByClassName('menuItem')[i].style.display =
                'none'
            document.getElementById('header').style.display = '60px'
            document.getElementById('header').style.height = '60px'
        }
    }
}
