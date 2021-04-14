var questionnumber = ["question 1",
	"question 2",
	"question 3",
	"question 4",
	"question 5",
	"question 6",
	"question 7",
	"question 8",
	"question 9",
	"question 10",
	"question 11",
	"question 12",
	"question 13",
	"question 14",
	"question 15",
	"question 16",
	"question 17",
	"question 18",
	"question 19",
	"question 20"
];
var question = ["1. Excluding the sun, what star is closest to the earth?",
	"2. What Is Dry Ice ",
	"3. What does a normal Human Being have 206 of? ",
	"4. What is the name of the instrument used for measuring humidity in the air ",
	"5. What Does Mass Multipled By Velocity Give You ",
	"6. Which Is The Largest Species Of Beetle ",
	"7. A scientist who studies reptiles and amphibians is known as a:",
	"8. Name one male fish that gives birth?",
	"9. What Is The Method Of Growing Plants Without Soil? ",
	"10. This is the main food of the blue whale.",
	"11. Our galaxy is commonly known as?",
	"12. What are the units of measurement for Power?",
	"13. Which Continent Is The Natural Habitat Of The Ostrich ",
	"14. What type of rock is marble?",
	"15. Which Is The Second Heaviest Land Animal?",
	"16. Which Country Is The Natural Habitat Of The Emu?",
	"17. What is the chihuahua named after?",
	"18. What is the Scientific name for the eardrum?",
	"19. What Do Koala Bears Live On? ",
	"20. How many large holes are in your head"
];

var answer = ["Proxima Centauri",
	"Solid Carbon Dioxide",
	"Bones",
	"Hygrometer",
	"Momentum",
	"The Goliath Beetle",
	"Herpetologist",
	"Sea horse",
	"Hydroponics",
	"Plankton",
	"Milky way",
	"Watt",
	"Africa",
	"Metamorphic",
	"The Hippopotamus",
	"Australia",
	"A Mexican state",
	"Tympanic membrane",
	"Eucalyptus Leaves ",
	"7"
];

if (document.getElementById('qno')) {


	document.getElementById('qno').innerHTML = questionnumber[i];
	document.getElementById('q').innerHTML = question[i];
	var i = 0;
	var s;
	var a = answer[i]


	function quest() {
		s = document.getElementById('s').value;
		if (s === answer[i] && i < 21) {
			document.getElementById('error').innerHTML = "";
			document.getElementById('correct').innerHTML = document.getElementById('s').value + " was correct!";
			i++;
			document.getElementById('qno').innerHTML = questionnumber[i];
			document.getElementById('q').innerHTML = question[i];
		} else if (i > 20) {
			document.getElementById('correct').innerHTML = "You have complete the quiz! congratulations";
		} else {
			document.getElementById('correct').innerHTML = "	";
			document.getElementById('error').innerHTML = "'" + document.getElementById('s').value + "'" +
				" is not the correct answer, please type: '" + answer[i] + "' to get to the next qestion :)";
		}
	}
}

function menu() {
	if (document.getElementsByClassName('menu_on')[0].style.display != "flex") {
		document.getElementsByClassName('menu_on')[0].style.display = "flex";
		document.getElementById('header').style.height = "100vh";
		document.getElementById('header').style.display = "100vh";
	} else {
		document.getElementsByClassName('menu_on')[0].style.display = "none";
		document.getElementById('header').style.display = "72px";
		document.getElementById('header').style.height = "72px";
	}

}

var initialScroll = window.scrollY;
window.onscroll = function thingy() {
	currentScroll = window.scrollY;

	if (currentScroll > initialScroll) {
		document.getElementById('header').style.top = "-72px";
	} else {
		document.getElementById('header').style.top = "0";
	}
	initialScroll = currentScroll;
}