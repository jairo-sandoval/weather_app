import { useState, useEffect } from 'react';
import getCurrentWeather from '../petitions/getCurrentWeather'
import nube from '../img/nube.png'
import Loader from './Loader';

const ApplicationWeather = () => {
    const [infoWeather, setInfoWeather] = useState({})
    const [converGrade, setConverGrade] = useState(0);
    const [isCentigrades, setIsCentigrades] = useState(true)
    const [loader, setLoader] = useState(true)

    const getTemp = (temp, estateWeather) => {
        if (estateWeather.main?.temp) {
            return (temp - 273.15).toFixed(1)
        }
    }

    function success(pos) {
        const crd = pos.coords;
        const penddingCurrentWeather = getCurrentWeather(crd.latitude, crd.longitude)

        penddingCurrentWeather.then(res => {
            setInfoWeather(res.data)
            setConverGrade(getTemp(res.data.main.temp, res.data))
            setLoader(false)

        })
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success)
    }, [])


    const getCountryName = () => {
        const regionNames = new Intl.DisplayNames(
            ['es'], { type: 'region' }
        );

        if (infoWeather.sys?.country) {
            return regionNames.of(infoWeather.sys.country);
        }
    }

    const toggleGrades = () => {
        if (isCentigrades) {
            const gradeFahrenheit = ((converGrade * 9 / 5) + 32).toFixed(1)
            setConverGrade(gradeFahrenheit)
            setIsCentigrades(!isCentigrades)
        } else {
            const gradeCentigrade = ((converGrade - 32) * 5 / 9).toFixed(1)
            setConverGrade(gradeCentigrade)
            setIsCentigrades(!isCentigrades)
        }
    }

    console.log(infoWeather)

    return (
        <>
            {
                !loader ?
                    (
                        <div className="card_weather">
                            <div className='text_gradient'>
                                <h1>{infoWeather.name}, {getCountryName()}</h1>
                                <img src={nube} alt="clouds" />
                                <h2>{infoWeather.weather?.[0].description}</h2>
                                <h3>Temperature: {converGrade}°{isCentigrades ? 'C' : 'F'}</h3>
                                <h3>Humidity: {infoWeather.main?.humidity} %</h3>
                                <h3>{infoWeather.weather?.[0].main} </h3>
                                <button onClick={toggleGrades}>Conver to {!isCentigrades ? 'Centigrates' : 'Fahrenheit'}</button>
                            </div>
                        </div>
                    )
                    :
                    <Loader />
            }
        </>
    );
};

export default ApplicationWeather;