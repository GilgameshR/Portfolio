// refer to question 4 before development starts for scope document
var nameTest = /([a-z]\.*\-*)+/i;
var numTest = /(\d{3} \d{3} \d{4})|(\d{3}-\d{3}-\d{4})|(\d{3}\.\d{3}\.\d{4})/;
var mailTest = /[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9!#$%&'*+/=?^_`{|}~.-]+\.([a-z0-9-]+)*/;

document.getElementById("submitContact").setAttribute("onclick", "validator()")

function validator() {
	var firstName = document.getElementById("firstName").value;
	var lastName = document.getElementById("lastName").value;
	var phone = document.getElementById("phone").value;
	var email = document.getElementById("email").value;

	if (nameTest.test(firstName) === false) {
		document.getElementById("firstNameError").style.display = "block";
	} else {
		document.getElementById("firstNameError").style.display = "none";
	}
	if (nameTest.test(lastName) === false) {
		document.getElementById("lastNameError").style.display = "block";
	} else {
		document.getElementById("lastNameError").style.display = "none";
	}
	if (numTest.test(phone) === false) {
		document.getElementById("phoneError").style.display = "block";
	} else {
		document.getElementById("phoneError").style.display = "none";
	}
	if (mailTest.test(email) === false) {
		document.getElementById("emailError").style.display = "block";
	} else {
		document.getElementById("emailError").style.display = "none";
	}
}