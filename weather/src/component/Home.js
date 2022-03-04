import React from 'react'
import './Home.css'

function Home() {
  let city = '';
  let lat = 36;
  let lon = 140; 

  const onClick = async() => {
    city = document.querySelector('#location').value || null;
    if (city === null) {
      alert('現在地を入力してください。');
      return;
    }
    const API_KEY = '167104da34f3de46ddfebdd2d4a09155'; // 後に.envを作ってgithubに公開しないようにする
    const weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + API_KEY;
    const forecastAPI = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + API_KEY;
    
    // Today's weather
    let weather = await fetch(weatherAPI, {
      method: 'GET',
      mode: 'cors'
    })
    .then(response => response.json())
    .then(data => data)
    
    if (weather.cod === '404') {
      alert('入力された場所の天気情報はありませんでした。');
      return;
    }
    console.log(weather);
    let icon = weather["weather"][0]["icon"];
    let iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
    let iconEl = document.querySelector('#icon');
    iconEl.setAttribute('src', iconurl);
    
    // 5days forecast
    let forecast = await fetch(forecastAPI, {
      method: 'GET',
      mode: 'cors'
    })
    .then(response => response.json())
    .then(data => data.list);
    console.log(forecast[0]);

    const result = document.querySelector('#result');

    // 天気予報リスト
    // Object.values(weather).forEach(value => {
    //   const currentDate = convertJST(value);
    //   const element = document.createElement('div');
    //   element.classList.add('weather-list');
    //   element.textContent = currentDate + ': ' + value["weather"][0]["description"];
    //   result.append(element);
    // });

    let date = new Date();
    let str = date.getFullYear()
      + '/' + ('0' + (date.getMonth() + 1)).slice(-2)
      + '/' + ('0' + date.getDate()).slice(-2)
      + ' ' + ('0' + date.getHours()).slice(-2)
      + ':' + ('0' + date.getMinutes()).slice(-2);
    const todayResult = document.querySelector('.today');
    todayResult.textContent = '現在の' + str + 'の天気は' + weather["weather"][0]["description"];

    const tomorrow = forecast[0];
    const currentDate = convertJST(tomorrow);
    const element = document.createElement('div');
    element.classList.add('tomorrow');
    element.textContent = '明日の' + currentDate + ': ' + tomorrow["weather"][0]["description"];
    result.append(element);

  };

  const convertJST = (value) => {
    let time = new Date(value.dt_txt);
    time.setHours(time.getHours() + 9);
    return time.toLocaleString().slice(0,-3);
    // console.log(currentDate);
  }

  return (
    <div className='container'>
        <label htmlFor='location'>現在地: </label>
        <input type='text' id='location' name='location' placeholder='現在地を入力してください' />
        {/* <input type='button' value='送信' onClick={onClick} /> */}
        <button onClick={onClick}>送信</button>
      <div className='title'>
        <p>(天気予報の結果をここに表示する)</p>
      </div>
      <div className='result' id='result'>
        <div className='today'>
        </div>
        <div className='tomorrow'></div>
      </div>
      <div>
        imgテスト
          <img id="icon" src="" alt="Weather icon"/>
      </div>
    </div>
  )
}

export default Home