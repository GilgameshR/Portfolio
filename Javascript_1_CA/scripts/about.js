// refer to question 3 before development starts for scope document
document.getElementById('aboutText').innerHTML = document.getElementById('aboutText').innerHTML.replace(/Magic/g, 'Something');

document.getElementById('moreInfoTrigger').setAttribute("onclick", "blockNone()");

function blockNone() {
	if (document.getElementById('moreInfoContent').style.display === "none") {
		document.getElementById('moreInfoContent').style.display = "block";
	} else {
		document.getElementById('moreInfoContent').style.display = "none";
	}
}