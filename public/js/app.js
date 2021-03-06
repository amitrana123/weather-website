//alert('test');
console.log('Client side JS file is loaded');

fetch('https://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    })
})

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    console.log(location)
    messageOne.textContent = 'Loading............';
    messageTwo.textContent = ''
    fetch('/weather?address='+ location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
                console.log(data.error)
            } else {
                messageOne.textContent = ""
                messageTwo.textContent = data.location + ' Tempature: ' + data.forecast.temperature + ' Feelslike: ' + data.forecast.temperature + ' Weather Descriotion ' + data.forecast.weather_descriptions;
                console.log(data.location);
                console.log(data.forecast);
            }
        })
    })

});