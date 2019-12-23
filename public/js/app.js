console.log('From inside the public..')

// Get access to the form
const weatherForm = document.querySelector('form')
// Get access to the search term
const searchLocation = document.querySelector('input')
// Get access to the paragraphs to show messages
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchLocation.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) return messageOne.textContent = data.error
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        })
    })

})

