try {
  var retrievedObject = JSON.parse(sessionStorage.cartContent);

  document.getElementById("counter").innerText = retrievedObject.length;
  document.getElementById("counter").style.display = "block";

  if (retrievedObject.length === 0) {
    document.getElementById("counter").style.display = "none";
  }
} catch (error) {
  document.getElementById("counter").style.display = "none";
}

try {
  var retrievedObject = JSON.parse(sessionStorage.cartContent);

  cartPopulate();
} catch (error) {}

function shippingCost() {
  if (document.getElementsByClassName("shipping")[0]) {
    document
      .getElementsByClassName("shipping")[0]
      .remove(document.getElementsByClassName("shipping")[0]);
    document.getElementsByClassName("shippingContainer")[0].innerHTML += `

																				<p class="shipping"></p>


																			`;
  }

  if (document.getElementById("fedex").checked === true) {
    document.getElementsByClassName(
      "shipping"
    )[0].innerHTML += `<span id="price">$10</span>`;
  }

  if (document.getElementById("ems").checked === true) {
    document.getElementsByClassName(
      "shipping"
    )[0].innerHTML += `<span id="price">$15</span>`;
  }

  if (document.getElementById("ups").checked === true) {
    document.getElementsByClassName(
      "shipping"
    )[0].innerHTML += `<span id="price">$20</span>`;
  }

  if (document.getElementsByClassName("shipping")[0] != undefined) {
    var tempShip = document.getElementsByClassName("shipping")[0].innerText;
    tempShip = parseInt(tempShip.replace(/[\D]/g, ""));
    var orderTotal = 0;

    for (let i = 0; i < retrievedObject.length; i++) {
      orderTotal =
        orderTotal +
        retrievedObject[i].price * retrievedObject[i].purchaseQuantity;
    }

    document
      .getElementsByClassName("totalValue")[0]
      .remove(document.getElementsByClassName("totalValue")[0]);
    document.getElementsByClassName(
      "totalContainer"
    )[0].innerHTML += `<p class="totalValue"><span id="price">$${orderTotal +
      tempShip}</span></p>`;
  }
}

// Populates the slideout cart, checkout and "my cart"
function cartPopulate() {
  var total = 0;

  for (let i = 0; i < retrievedObject.length; i++) {
    // populates the slideout cart with items
    document.getElementById("cartWindow").innerHTML += `
																<div class="itemRow" id="cartItem${i}">
																	<div class="picture">
																		<img src="${retrievedObject[i].imageUrl}">
																	</div>

																	<div class="name">
																		<h2>${retrievedObject[i].name}</h2>
																	</div>

																	<div class="adjust">
																		<button id="qtySub" name="${i}" onClick='cartAdjust("-", name)'>-</button>
																		<input type="text" id="shop${i}" value="${retrievedObject[i].purchaseQuantity}">
																		<button id="qtyAdd" name="${i}" onClick='cartAdjust("+", name)'>+</button>
																	</div>

																	<div class="price">
																		<p>$${retrievedObject[i].price * retrievedObject[i].purchaseQuantity}</p>
																	</div>

																</div>
															`;

    // Attempts to populate the "my cart" page with items
    try {
      document.getElementsByClassName("myCart")[0].innerHTML += `
																			<div class="cartRow" id="myCartItem${i}">
																				<div class="cartProduct">
																					<h2>${retrievedObject[i].name}</h2>
																					<img src="${retrievedObject[i].imageUrl}">
																				</div>

																				<div class="cartPrice">
																					<p>$${retrievedObject[i].price}</p>
																				</div>

																				<div class="cartQty">
																					<button id="qtySub" name="${i}" onClick='cartAdjust("-", name)'>-</button>
																					<input type="text" id="myItem${i}" value="${
        retrievedObject[i].purchaseQuantity
      }">
																					<button id="qtyAdd" name="${i}" onClick='cartAdjust("+", name)'>+</button>
																				</div>

																				<div class="cartTotal">
																					<p>$${retrievedObject[i].price * retrievedObject[i].purchaseQuantity}</p>
																				</div>
																				
																			</div>
																		`;
    } catch (error) {}

    // Attempts to populate the checkout page
    try {
      document.getElementsByClassName("checkoutProd")[0].innerHTML += `
																				<div class="cartRow" id="myCartItem${i}">
																					<h2 class="prodName">${retrievedObject[i].name}</h2>
																					<div class="cartProduct">
																						<img src="${retrievedObject[i].imageUrl}">
																					</div>
																				
																					<div class="cartPrice">
																						<p>$${retrievedObject[i].price}</p>
																					</div>
																				
																					<div class="cartQty">
																						<p>Quantity: ${retrievedObject[i].purchaseQuantity}</p>
																					</div>
																				
																					<div class="cartTotal">
																						<p>$${retrievedObject[i].price * retrievedObject[i].purchaseQuantity}</p>
																					</div>
																					
																				</div>
																			`;
    } catch (error) {}

    // Calculates the total value of items in the cart
    total =
      total + retrievedObject[i].price * retrievedObject[i].purchaseQuantity;
  }

  // Checks if slideout cart has a total order value, if no then it will be added,
  // if yes it will be removed and then add the updated value to avoid duplicates.
  if (!document.getElementsByClassName("cartWindowTotal")[0]) {
    document.getElementById("cartWindow").innerHTML += `
																<div class="cartWindowTotal">
																<p>Order total</p>
																<p>$${total}</p>
																</div>
															`;
  } else {
    document
      .getElementsByClassName("cartWindowTotal")[0]
      .remove(document.getElementsByClassName("cartWindowTotal")[0]);
    document.getElementById("cartWindow").innerHTML += `
																<div class="cartWindowTotal">
																<p>Order total</p>
																<p>$${total}</p>
																</div>
															`;
  }

  // Checks if the checkout page has a total order value, if no then it will attempt to add the value,
  // if yes it will attempt to delete, and then re-add the updated value to avoid duplicates.
  if (!document.getElementsByClassName("checkoutTotal")[0]) {
    try {
      document.getElementsByClassName("checkoutProd")[0].innerHTML += `
																				<div class="checkoutTotal">
																				<div class="shippingContainer">
																				<p>Shipping</p>
																				<p class="shipping"><span id="price">$0</span></p>
																				</div>
																				<div class="totalContainer">
																				<p>Order total:</p>
																				<p class="totalValue"><span id="price">$${total}</span></p>
																				</div>
																				</div>
																			`;
    } catch (error) {}
  } else {
    try {
      document
        .getElementsByClassName("checkoutTotal")[0]
        .remove(document.getElementsByClassName("checkoutTotal")[0]);
      document.getElementsByClassName("checkoutProd")[0].innerHTML += `	
																				<div class="checkoutTotal">
																				<div class="shippingContainer">
																				<p class="shipping><span id="price">$0</span></p>
																				</div>
																				<div class="totalContainer">
																				<p>Order total</p>
																				<p class="totalValue"><span id="price">$${total}</span></p>
																				</div>
																				</div>
																			`;
    } catch (error) {}
  }

  // Checks if the slideout cart has a go to cart button, if no it will add one, if yes it will remove and re-add the button.
  if (!document.getElementsByClassName("checkout")[0]) {
    if (!document.getElementById("logo")) {
      document.getElementById("cartWindow").innerHTML += `
																<a href="cart.html" class="checkout"><button>Go to cart</button></a>
															`;
    } else {
      document.getElementById("cartWindow").innerHTML += `
																<a href="html/cart.html" class="checkout"><button>Go to cart</button></a>
															`;
    }
  } else {
    document
      .getElementsByClassName("checkout")[0]
      .remove(document.getElementsByClassName("checkout")[0]);
    if (!document.getElementById("logo")) {
      document.getElementById("cartWindow").innerHTML += `
																<a href="cart.html" class="checkout"><button>Go to cart</button></a>
															`;
    } else {
      document.getElementById("cartWindow").innerHTML += `
																<a href="html/cart.html" class="checkout"><button>Go to cart</button></a>
															`;
    }
  }

  // Checks if the "my cart" page has a total order value,
  // if no it will attempt to add one, if yes it will attempt to remove it before adding the updated version.
  if (
    !document.getElementsByClassName("orderTotal")[0] &&
    !document.getElementsByClassName("checkoutTotal")[0] &&
    document.getElementsByClassName("cartRow")[0]
  ) {
    try {
      document.getElementsByClassName("cartProdTotal")[0].innerHTML += `
																			<div class="orderTotal">
																			<p>Order total</p>
																			<p>$${total}</p>
																			</div>
																		`;
    } catch (error) {
      document
        .getElementsByClassName("orderTotal")[0]
        .remove(document.getElementsByClassName("orderTotal")[0]);
      document.getElementsByClassName("cartProdTotal")[0].innerHTML += `
																			<div class="orderTotal">
																			<p>Order total</p>
																			<p>$${total}</p>
																			</div>
																		`;
    }
  }
}

// Handles opening and closing of the slideout cart
function cartWindow() {
  if (document.getElementById("cartWindow").style.display != "block") {
    document.getElementById("cartWindow").style.display = "block";
  } else {
    document.getElementById("cartWindow").style.display = "none";
  }
}

document.addEventListener("click", function(event) {
  if (event.target.closest(".cartWindow") || event.target.closest("#cartWrap"))
    return;

  document.getElementById("cartWindow").style.display = "none";
});

// handles incrementation and decrementation of items in the slideout cart as well as "my cart" || checkout.
function cartAdjust(addSub, btnName) {
  var cartNo = "shop" + btnName;
  var myCartNo = "myItem" + btnName;

  if (addSub === "+") {
    document
      .getElementById(cartNo)
      .setAttribute(
        "value",
        String(parseInt(document.getElementById(cartNo).value) + 1)
      );
    try {
      document
        .getElementById(myCartNo)
        .setAttribute(
          "value",
          String(parseInt(document.getElementById(myCartNo).value) + 1)
        );
    } catch (error) {}
  }
  if (
    (addSub === "-" && document.getElementById(cartNo).value != "0") ||
    (addSub === "-" && document.getElementById(myCartNo).value != "0")
  ) {
    document
      .getElementById(cartNo)
      .setAttribute(
        "value",
        String(parseInt(document.getElementById(cartNo).value) - 1)
      );
    try {
      document
        .getElementById(myCartNo)
        .setAttribute(
          "value",
          String(parseInt(document.getElementById(myCartNo).value) - 1)
        );
    } catch (error) {}
  }

  // Sets the order quantity for each item
  retrievedObject[btnName].purchaseQuantity = parseInt(
    document.getElementById(cartNo).value
  );
  try {
    retrievedObject[btnName].purchaseQuantity = parseInt(
      document.getElementById(myCartNo).value
    );
  } catch (error) {}

  // Checks if an item has its quantity altered and updates the session cookie that stores the cart.
  // If an item's quantity is reduced to 0 the carts item counter value is refreshed to show the current (unique) item count.
  // If there are no items in the cart the counter is hidden.
  if (document.getElementById(cartNo).value === "0") {
    retrievedObject.splice(btnName, 1);
    sessionStorage.cartContent = JSON.stringify(retrievedObject);
    document.getElementById("counter").innerText = retrievedObject.length;

    if (retrievedObject.length === 0) {
      document.getElementById("counter").style.display = "none";
    }
  } else {
    sessionStorage.cartContent = JSON.stringify(retrievedObject);
  }

  // Removes all items from slideout cart, "my cart" and checkout
  // before running the function to repopulate whenever the item list needs to be refreshed
  while (document.getElementsByClassName("itemRow")[0]) {
    document
      .getElementsByClassName("itemRow")[0]
      .remove(document.getElementsByClassName("itemRow")[0]);
    try {
      document
        .getElementsByClassName("cartRow")[0]
        .remove(document.getElementsByClassName("cartRow")[0]);
    } catch (error) {}
  }

  cartPopulate();
}
if (document.getElementById("cardDay")) {
  for (let i = 1; i < 31; i++) {
    document.getElementById(
      "cardDay"
    ).innerHTML += `<option value="${i}">${i}</option>`;
  }

  for (let i = 1; i <= 12; i++) {
    document.getElementById(
      "cardMonth"
    ).innerHTML += `<option value="${i}">${i}</option>`;
  }
}

function complete() {
  function validate() {
    let result = true;

    const nameTest = /([a-z]\.*\-*)+/i;
    const zipTest = /(\d{4})|(\d{5})/;
    const cardTest = /(\d{4} \d{4} \d{4} \d{4})|(\d{4}-\d{4}-\d{4}-\d{4})|(\d{16})/;
    const cvcTest = /(\d{3})/;
    const mailTest = /[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9!#$%&'*+/=?^_`{|}~.-]+\.([a-z0-9-]+)*/;
    const fedex = document.getElementById("fedex");
    const ems = document.getElementById("ems");
    const ups = document.getElementById("ups");
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("email");
    const address = document.getElementById("address");
    const country = document.getElementById("country");
    const state = document.getElementById("state");
    const zip = document.getElementById("zip");
    const credit = document.getElementById("credit");
    const debit = document.getElementById("debit");
    const cardName = document.getElementById("cardName");
    const cardNumber = document.getElementById("cardNumber");
    const cardDay = document.getElementById("cardDay");
    const cardMonth = document.getElementById("cardMonth");
    const cardYear = document.getElementById("cardYear");
    const cvc = document.getElementById("cvc");

    const date = new Date();
    const currentDay = date.getDate();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();

    if (fedex.checked && ems.checked && ups.checked === false) {
      document.getElementById("shippingError").style.display = "none";
      result = false;
    } else {
      document.getElementById("shippingError").style.display = "block";
    }
    if (nameTest.test(firstName.value) === false) {
      document.getElementById("firstNameError").style.display = "block";
      result = false;
    } else {
      document.getElementById("firstNameError").style.display = "none";
    }
    if (nameTest.test(lastName.value) === false) {
      document.getElementById("lastNameError").style.display = "block";
      result = false;
    } else {
      document.getElementById("lastNameError").style.display = "none";
    }
    if (mailTest.test(email.value) === false) {
      document.getElementById("emailError").style.display = "block";
      result = false;
    } else {
      document.getElementById("emailError").style.display = "none";
    }

    if (nameTest.test(address.value) === false) {
      document.getElementById("addressError").style.display = "block";
      result = false;
    } else {
      document.getElementById("addressError").style.display = "none";
    }

    if (
      nameTest.test(country.value) === false &&
      nameTest.test(state.value) === false &&
      zipTest.test(zip.value) === false
    ) {
      document.getElementById("locationError").style.display = "block";
      result = false;
    } else {
      document.getElementById("locationError").style.display = "none";
    }

    if (credit.checked || debit.checked === true) {
      document.getElementById("paymentError").style.display = "none";
    } else {
      document.getElementById("paymentError").style.display = "block";
      result = false;
    }

    if (nameTest.test(cardName.value) === false) {
      document.getElementById("cardNameError").style.display = "block";
      result = false;
    } else {
      document.getElementById("cardNameError").style.display = "none";
    }

    if (cardTest.test(cardNumber.value) === false) {
      document.getElementById("cardNoError").style.display = "block";
      result = false;
    } else {
      document.getElementById("cardNoError").style.display = "none";
    }
    if (cardYear.value && cardMonth.value && cardDay.value) {
      if (
        (parseInt(cardYear.value) > currentYear &&
          cardYear.value - currentYear < 5) ||
        (parseInt(cardYear.value) === currentYear &&
          cardMonth.value > currentMonth + 1) ||
        (parseInt(cardYear.value) === currentYear &&
          cardMonth.value >= currentMonth + 1 &&
          cardDay.value >= currentDay)
      ) {
        document.getElementById("cardDateError").style.display = "none";
      } else {
        document.getElementById("cardDateError").style.display = "block";
        result = false;
      }
    } else {
      document.getElementById("cardDateError").style.display = "block";
      result = false;
    }

    if (cvcTest.test(cvc.value) === false) {
      document.getElementById("cvcError").style.display = "block";
      result = false;
    } else {
      document.getElementById("cvcError").style.display = "none";
    }

    return result;
  }

  const result = validate();

  if (result === true) {
    document
      .getElementsByClassName("checkoutForm")[0]
      .remove(document.getElementsByClassName("checkoutForm")[0]);
    document.getElementsByTagName("main")[0].innerHTML += `
															<div class="purchaseComplete">
																<h1>Purchase complete</h1>
																<img src="../assets/complete.png" alt="Purchase complete">
																<p>Please wait while we redirect you</p>
															</div>
														`;
    while (document.getElementsByClassName("itemRow")[0]) {
      document
        .getElementsByClassName("itemRow")[0]
        .remove(document.getElementsByClassName("itemRow")[0]);
    }

    document
      .getElementsByClassName("cartWindowTotal")[0]
      .remove(document.getElementsByClassName("cartWindowTotal")[0]);
    document.getElementById("counter").style.display = "none";
    sessionStorage.cartContent = "";

    setTimeout(() => {
      location.replace("../index.html");
    }, 2000);
  }
}
