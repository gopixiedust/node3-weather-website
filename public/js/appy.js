console.log('Client side js is loaded!')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

/*fetch('/weather?search=delhi').then((response)=>{
        response.json().then((data)=>{
            console.log(data)
        })
    })*/

const weatherForm = document.querySelector('form') 
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



messageOne.textContent = 'Form Javascript'

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
   // console.log('testing!')
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    
fetch('http://localhost:3000/weather?search='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error
        }
        else {
            messageOne.textContent = data.locat
            messageTwo.textContent = data.forecast
        }
        //console.log(data)
    })
})
})

