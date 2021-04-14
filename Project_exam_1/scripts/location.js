/* eslint-disable no-undef */

//  stores the api links required later
const api = [
    'https://corsunblocker.herokuapp.com/http://api.open-notify.org/iss-now.json',
    'https://corsunblocker.herokuapp.com/http://api.open-notify.org/astros.json',
];

//  receives position data from the promise below and makes use of the google embed API to embed a map showing the current location of the ISS in the DOM
function issLocation(position) {
    document.querySelector('#map').innerHTML += `
        <iframe
            src="https://www.google.com/maps/embed/v1/place?key=########&q=${position.latitude},${position.longitude}&zoom=3"allowfullscreen>
        </iframe>`;
}

// receives crew data from the promise below and pushes to the DOM
const crew = people => {
    Object.keys(people).forEach(key => {
        document.querySelector('#crew').innerHTML += `<div><p>${people[key].name}</p>
        <p>Craft: ${people[key].craft}</p><div>
        `;
    });
};

// promise that runs through the array map and hands off the data to the their related functions
Promise.all(
    api.map(apiReq =>
        fetch(apiReq, { credentials: 'omit' })
            .then(result => {
                result.json().then(data => {
                    if (data.iss_position !== undefined) {
                        issLocation(data.iss_position);
                    }
                    if (data.people !== undefined) {
                        crew(data.people);
                    }
                });
            })
            .catch(err => {
                console.log(err);
            })
    )
);
