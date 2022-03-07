import axios from 'axios'

async function getCurrentWeather(lat, lon){
    const APIKEY = 'cfe7510794b0931d77126f6100e2a1ad'
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}`)
        .then(res => res)
        .catch(err => console.error('error on the request api weather', err))

}   

export default getCurrentWeather