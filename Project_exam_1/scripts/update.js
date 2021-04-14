/* eslint-disable no-undef */

//  Fetches XML --> verifies response is XML and pushes desired data to DOM
const xhr = new XMLHttpRequest()
xhr.open(
    'GET',
    'https://cors-anywhere.herokuapp.com/https://blogs.nasa.gov/spacestation/feed/'
)

xhr.onload = function() {
    //  checks the response, making sure its XML and acts as an anchor to the "item" tag
    const xmlItem = xhr.responseXML.getElementsByTagName('item')[0]

    document.getElementById('updates').innerHTML += `
                        <h2>Updates</h2>
                        <h3>
                            ${
                                xmlItem.getElementsByTagName('title')[0]
                                    .childNodes[0].nodeValue
                            }
                        </h3>
                        <p>
                            ${
                                xmlItem.getElementsByTagName('description')[0]
                                    .childNodes[0].nodeValue
                            }
                        </p>
                        <a href="
                            ${
                                xmlItem.getElementsByTagName('link')[0]
                                    .childNodes[0].nodeValue
                            }
                            "><button>Read more</button></a>`
}
xhr.send()
