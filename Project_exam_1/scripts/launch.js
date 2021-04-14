/* eslint-disable no-undef */

fetch('https://lldev.thespacedevs.com/2.0.0/launch/?fields=name%2Cpad%2Cwindow_start&format=json&limit=100&offset=1650')
    .then(result => {
        result.json().then(data => {
            const eventArr = [];
            Object.keys(data.results).forEach(key => {
                const launchDate = new Date(data.results[key].window_start);
                eventArr.push({
                    title: `${data.results[key].name}`,
                    location: `${data.results[key].pad.name}`,
                    start: `${launchDate.toISOString()}`,
                    end: `${launchDate.toISOString()}`,
                    extendedProps: {
                        dateTime: `${launchDate.toLocaleString('en-GB', { timeZone: 'UTC' })}`,
                    },
                });
            });
            const calendarEl = document.getElementById('calendar');
            const calendar = new FullCalendar.Calendar(calendarEl, {
                plugins: ['dayGrid'],
                defaultDate: `${new Date().toISOString()}`,
                events: eventArr,
                eventMouseEnter(mouseEnterInfo) {
                    mouseEnterInfo.el.classList.add('fc-event-hover');
                    mouseEnterInfo.el.getElementsByClassName(
                        'fc-content'
                    )[0].innerHTML += `<span class="fc-location">Location: ${mouseEnterInfo.event._def.extendedProps.location}</span>
                                                    <span class="fc-dateTime">Start date: ${mouseEnterInfo.event._def.extendedProps.dateTime}</span>`;
                },
                eventMouseLeave(mouseLeaveInfo) {
                    mouseLeaveInfo.el
                        .getElementsByClassName('fc-content')[0]
                        .removeChild(document.getElementsByClassName('fc-location')[0]);
                    mouseLeaveInfo.el
                        .getElementsByClassName('fc-content')[0]
                        .removeChild(document.getElementsByClassName('fc-dateTime')[0]);

                    mouseLeaveInfo.el.classList.remove('fc-event-hover');
                },
            });
            calendar.render();
        });
    })
    .catch(err => {
        console.log(err);
    });

const path = [
    ['name'],
    ['window_start'],
    ['status', 'name'],
    ['vidURLs', 0],
    ['pad', 'name'],
    ['pad', 'agencies', 0, 'abbrev'],
    ['pad', 'agencies', 0, 'countryCode'],
    ['name'],
    ['rocket', 'configuration', 'name'],
    ['image'],
    ['missions', 0, 'name'],
    ['missions', 0, 'description'],
    ['missions', 0, 'typeName'],
    ['missions', 0, 'agencies', 0, 'abbrev'],
    ['missions', 'payloads', 0, 'name'],
    ['missions', 'payloads', 1, 'name'],
    ['launch_service_provider', 'name'],
    ['pad', 'location', 'country_code'],
];

// receives data from fetch
const launch = data => {
    //  creates a loop that will run once for each object (in this case once per unique NASA launch)
    Object.keys(data).forEach(item => {
        //  generates the DOM elements we'll be utilizing (one DOM push per launch)
        document.querySelector('.launchGroup').innerHTML += `
                <div class="launch">
                    <div class="general" id="closed">
                        <div class="headText"></div>
                        <div class="arrow"></div>
                    </div>
                    <div class="padLoc">
                        <h3>Launch pad</h3>
                        <div class="launchData"></div>
                    </div>
                    <div class="rocket">
                        <h3>Rocket</h3>
                        <div class="launchData"></div>
                    </div>
                    <div class="rocketImg"></div>
                    <div class="mission">
                        <h3>Mission</h3>
                        <div class="launchData"></div>
                    </div>
                    <div class="lsp">
                        <h3>Launch Service Provider</h3>
                        <div class="launchData"></div>
                    </div>
                </div>
        `;
        let i = 0;
        let docClass = 'headText';

        //  creates a loop that will run once per key in the path array
        path.forEach(currentItem => {
            //  creates a function that will attempt to access the desired data based on the path given to it and returns it if successful
            const nestedObj = pathArr => {
                return pathArr.reduce((obj, key) => (obj && obj[key] !== (undefined || null) ? obj[key] : undefined), data[item]);
            };

            // initiates the nestedObj function
            const dataset = nestedObj(currentItem);

            // checks if the returned data is defined before continuing
            if (dataset !== undefined) {
                //  checks the counter i set to see what index in the path array the loop is on, and adjusts the target document class accordingly
                if (i >= 4 && i <= 7) {
                    docClass = 'padLoc';
                }
                if (i === 8) {
                    docClass = 'rocket';
                }
                if (i === 9) {
                    docClass = 'rocketImg';
                }
                if (i >= 10 && i <= 15) {
                    docClass = 'mission';
                }
                if (i >= 16 && i <= 17) {
                    docClass = 'lsp';
                }

                const classQuery = document.getElementsByClassName(docClass)[item];
                // series of switch cases that structures "special" data so that e.g. accompanying links are placed/wrapped appropriately by comparing against the path array
                switch (true) {
                    case currentItem === path[0]:
                        classQuery.innerHTML += `<h2>${dataset}</h2>`;
                        document.getElementsByClassName('arrow')[
                            item
                        ].innerHTML += `<img src="../assets/arrow.svg" class="arrowBtn"></img>`;
                        break;

                    case currentItem === path[2]:
                        classQuery.innerHTML += `<p>Current status: ${dataset}</p>`;
                        break;

                    case currentItem === path[4]:
                        classQuery.getElementsByClassName(
                            'launchData'
                        )[0].innerHTML += `<p>Location: <a href="${data[item].pad.wiki_url}">${dataset}</a></p>`;
                        break;

                    case currentItem === path[5]:
                        classQuery.getElementsByClassName(
                            'launchData'
                        )[0].innerHTML += `<p>Agency in charge of the launch pad: <a href="${data[item].pad.agencies[0].wiki_url}">${dataset}</a></p>`;
                        break;

                    case currentItem === path[8]:
                        classQuery.getElementsByClassName(
                            'launchData'
                        )[0].innerHTML += `<p>Model: <a href="${data[item].rocket.wikiURL}">${dataset}</a></p>`;
                        break;

                    case currentItem === path[9]:
                        classQuery.innerHTML += `<img src="${dataset}"></img>`;
                        break;

                    case currentItem === path[10]:
                        classQuery.getElementsByClassName(
                            'launchData'
                        )[0].innerHTML += `<p><a href="${data[item].missions[0].wikiURL}">${dataset}</a></p>`;
                        break;

                    case currentItem === path[13]:
                        classQuery.getElementsByClassName(
                            'launchData'
                        )[0].innerHTML += `<p>Agency in charge of the mission: <a href="${data[item].missions[0].agencies[0].wikiURL}">${dataset}</a></p>`;
                        break;

                    case currentItem === path[16]:
                        classQuery.getElementsByClassName(
                            'launchData'
                        )[0].innerHTML += `<p>Launch service provider: <a href="${data[item].launch_service_provider.wiki_url}">${dataset}</a></p>`;
                        break;

                    case currentItem === path[3]:
                        classQuery.innerHTML += `<iframe width="560" height="315" src="${dataset}</" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                        break;

                    default:
                        if (i > 4) {
                            classQuery.getElementsByClassName('launchData')[0].innerHTML += `<p>${dataset}</p>`;
                        } else {
                            classQuery.innerHTML += `<p>${dataset}</p>`;
                        }
                        break;
                }
            }
            i++;
        });
    });
    const arrowSelector = '.arrow img';
    const arrowTarget = document.querySelectorAll(arrowSelector);
    arrowTarget.forEach(currentItem => {
        //    this never runs from the looks of it
        currentItem.addEventListener('click', event => {
            if (!event.target.matches(arrowSelector)) {
                return;
            }
            const targetArrow = event.target;
            const containerElement = targetArrow.closest('.general');
            const launchElement = containerElement.closest('.launch');

            if (containerElement.id === 'closed') {
                targetArrow.style.transform = 'rotate(0.5turn)';
                containerElement.id = 'open';
                for (let i = 1; i < launchElement.childNodes.length; i++) {
                    if (
                        launchElement.childNodes[i].className === 'padLoc' ||
                        launchElement.childNodes[i].className === 'rocket' ||
                        launchElement.childNodes[i].className === 'rocketImg' ||
                        launchElement.childNodes[i].className === 'mission' ||
                        launchElement.childNodes[i].className === 'lsp'
                    ) {
                        launchElement.childNodes[i].style.display = 'flex';
                    }
                }
            } else {
                targetArrow.style.transform = 'rotate(0turn)';
                containerElement.id = 'closed';
                for (let i = 1; i < launchElement.childNodes.length; i++) {
                    if (
                        launchElement.childNodes[i].className === 'padLoc' ||
                        launchElement.childNodes[i].className === 'rocket' ||
                        launchElement.childNodes[i].className === 'rocketImg' ||
                        launchElement.childNodes[i].className === 'mission' ||
                        launchElement.childNodes[i].className === 'lsp'
                    ) {
                        launchElement.childNodes[i].style.display = 'none';
                    }
                }
            }
        });
    });
};

//  fetches the data and initiates launch(), resulting in the above kicking in.
fetch('https://lldev.thespacedevs.com/2.0.0/launch/?lsp=nasa&limit=15')
    .then(result => {
        result.json().then(data => {
            launch(data.results);
        });
    })
    .catch(err => {
        console.log(err);
    });
