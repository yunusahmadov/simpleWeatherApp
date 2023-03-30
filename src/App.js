import React, { useEffect, useState } from 'react'
import hotBg from './assets/yunus2.jpg'
import coldBg from './assets/yunus1.jpg'
import Description from './yunus_components/Description'
import { getFormattedWeatherData } from './weatherService'

function App() {
const [weather,setWeather]=useState('')
const [units,setUnits]=useState('metric')
const [city,setCity]=useState('Baku')
const [bg,setBg]=useState(hotBg)

  useEffect(()=>{
      const weatherData= async()=>{
        const data= await getFormattedWeatherData(city,units)
        setWeather(data)

        const threshold = units === "metric" ? 20 : 60;
        if (data.temp <= threshold) setBg(coldBg);
        else setBg(hotBg);
      }
      weatherData();
  },[units,city])
  const handleUnitClick =(e)=>{
      const button =e.currentTarget;
      const currentUnit=button.innerText.slice(1)
      const isCelsius = currentUnit === "C";
      button.innerText = isCelsius ? "°F" : "°C";
      setUnits(isCelsius ? "metric" : "imperial");
  }
  

  const enterKeyPressed=(e)=>{
      if (e.keyCode ===13) {
        setCity(e.currentTarget.value)
        // убирает фокус после нажатия remove focus after key press
        e.currentTarget.blur()
      }
  }

  return (
    <div className='app' style={{backgroundImage:`url(${bg})`}} >
          <div className="overlay">
                {
                  weather?
                  <div className="container">
                  <div className="section section_inputs">
                    <input onKeyDown={enterKeyPressed} type="text" placeholder='Enter city...'/>
                    {/* <p className='enter'>Press Enter</p>
                    <p className='change'>Change</p> */}
                    <div className='press-change-container'>
                       <p className='enter'>Press Enter</p>
                    <p className='change'>Change</p>
                    </div>
                    <button onClick={(e)=>handleUnitClick(e)}>°F</button>
                  </div>
                  
                  <div className="section section_temperature">
                    <div className="icon">
                      <h3>{`${weather.name},${weather.country}`}</h3>
                      <img src={weather.iconUrl} alt="weatherIcon" />
                      <h3>{weather.description}</h3>
                    </div>
                    <div className="tempertaure">
                      <h1>{`${weather.temp.toFixed()} °${units ===
                        'metric' ? 'C' :"F"}`}</h1>
                    </div>
                  </div>
                    <Description weather={weather} units={units}/>
                </div>:null
                }
          </div>
    </div>
  )
}

export default App