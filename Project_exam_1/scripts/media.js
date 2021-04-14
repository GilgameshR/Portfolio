const mediaHandler = data => {
    document.getElementById('videoContainer').childNodes.forEach(element => {
        console.log(element);
        console.log(document.getElementById('videoContainer').childNodes);

        document.getElementById('videoContainer').removeChild(document.getElementById('videoContainer').childNodes[0]);
    });
    data.items.forEach(currentItem => {
        document.getElementById('videoContainer').innerHTML += `
        <div>
        <iframe
                {

                src="https://www.youtube.com/embed/${currentItem.id.videoId}"}
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
        <p>${currentItem.snippet.title}</p>
            </div>
            `;
    });
    if (data.prevPageToken !== undefined) {
        document.getElementById('prevPageBtn').value = data.prevPageToken;
        document.getElementById('prevPageBtn').style.display = 'block';
    } else {
        document.getElementById('prevPageBtn').value = undefined;
        document.getElementById('prevPageBtn').style.display = 'none';
    }
    if (data.nextPageToken !== undefined) {
        document.getElementById('nextPageBtn').value = data.nextPageToken;
        document.getElementById('nextPageBtn').style.display = 'block';
    } else {
        document.getElementById('nextPageBtn').value = undefined;
        document.getElementById('nextPageBtn').style.display = 'none';
    }
    data = undefined;
};

window.addEventListener('DOMContentLoaded', event => {
    fetch(
        'https://www.googleapis.com/youtube/v3/search?key=###########&channelId=UCLA_DiR1FfKNvjuUpBHmylQ&part=snippet,id&order=date&maxResults=9&nextPageToken'
    )
        .then(result => {
            result.json().then(data => {
                mediaHandler(data);
            });
        })
        .catch(err => {
            console.log(err);
        });
});

document.querySelectorAll('.mediaDir').forEach(currentItem => {
    currentItem.addEventListener('click', event => {
        if (!event.target.matches('.mediaDir')) {
            return;
        }
        fetch(
            `https://www.googleapis.com/youtube/v3/search?key=########&channelId=UCLA_DiR1FfKNvjuUpBHmylQ&part=snippet,id&order=date&maxResults=9&pageToken=${event.target.value}`
        )
            .then(result => {
                result.json().then(data => {
                    mediaHandler(data);
                });
            })
            .catch(err => {
                console.log(err);
            });
    });
});
