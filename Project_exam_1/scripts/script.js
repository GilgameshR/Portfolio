/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */

if (document.title === 'Home') {
    fetch('https://lldev.thespacedevs.com/2.0.0/launch/?fields=name%2Cpad%2Cwindow_start&format=json&limit=20&offset=1720')
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
}

initialScroll = window.scrollY;
window.onscroll = () => {
    currentScroll = window.scrollY;

    if (currentScroll > initialScroll && document.querySelector('ul').style.display === 'none') {
        document.querySelector('header').style.top = '-80px';
    }
    initialScroll = currentScroll;
};
const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', menuClick());

menuClick();

function menuClick() {
    if (window.innerHeight > window.innerWidth) {
        if (document.querySelector('ul').style.display === 'flex') {
            document.querySelector('header').style.height = '80px';
            document.querySelector('ul').style.display = 'none';
            return;
        } else {
            document.querySelector('header').style.height = '100vh';
            document.querySelector('ul').style.display = 'flex';
            return;
        }
    }
}
