import React from 'react'
import { useState } from 'react' 
import './Home.css'
import Select from 'react-select'
import Pref from './Pref'
import WeatherList from './WeatherList'
import Spinner from './Spinner'

function Home() {

  const [loading, setLoading] = useState(true);
  const [options, latlon] = Pref();
  const list = WeatherList();

  const onClick = async() => {

    let key = document.querySelector('.pref-select input[name=select]').value
    if (!key) {
      alert('現在地を選択してください。');
      return false;
    }

    document.querySelectorAll('.contents').forEach(element => {
      element.classList.add('hidden');
    })
    let lat = latlon[key]['lat'];
    let lon = latlon[key]['lon'];

    // APIはenvにで管理
    const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
    const onecallAPI = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + API_KEY;

    setLoading(false);

    // onecall api 現在の11:00から一週間分の11:00のデータが表示される)
    let onecall = await fetch(onecallAPI, {
      method: 'GET',
      mode: 'cors'
    })
    .then(response => response.json())
    .then(data => data.daily)
    
    if (onecall.cod === '404') {
      alert('入力された場所の天気情報はありませんでした。');
      return;
    }

    // onecall apiで取得したdailyデータ
    let today = onecall[0].weather[0];
    let tomorr = onecall[1].weather[0];

    let todayIconUrl = "http://openweathermap.org/img/w/" + today.icon + ".png";
    let tomorrowIconUrl = "http://openweathermap.org/img/w/" + tomorr.icon + ".png";

    // 今日
    const todayResult = document.querySelector('.today');
    todayResult.textContent = '今日の天気は「' + list[today.id] + '」です。';
    document.querySelector('#today-icon').setAttribute('src', todayIconUrl);

    // 明日
    const tomorrowResult = document.querySelector('.tomorrow');
    tomorrowResult.textContent = '明日の天気は「' + list[tomorr.id] + '」です。';
    document.querySelector('#tomorrow-icon').setAttribute('src', tomorrowIconUrl);

    document.querySelectorAll('.contents').forEach(element => {
      element.classList.remove('hidden');
      element.querySelector('img').classList.remove('hidden');
    });

    setLoading(true)

  };

  return (
    <div className='container'>
      <div className='search'>
        <label htmlFor='location'>現在地を選択してください</label>
        <Select options={options} name='select' className='pref-select' />
        <button onClick={onClick}>検索</button>
      </div>

      <div className='loading'>{loading ? '' : <Spinner />}</div>

      <div className='result' id='result'>
        
        <div className='contents'>
          <p className='today'></p>
          <img id="today-icon" className='today-img hidden' src="" alt="Weather icon"/>
        </div>

        <div className='contents'>
          <p className='tomorrow'></p>
          <img id="tomorrow-icon" className='tomorrow-img hidden' src="" alt="Weather icon"/>
        </div>

      </div>
    </div>
  )
}

export default Home