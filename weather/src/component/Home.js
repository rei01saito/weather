import React from 'react'
import './Home.css'
import Select from 'react-select'
import Pref from './Pref'

function Home() {

  const [options, latlon] = Pref();

  let city = '';
  let lat = 36;
  let lon = 140;

  const onClick = async() => {
    let key = document.querySelector('.pref-select input[name=select]').value
    if (!key) {
      alert('現在地を入力してください。');
      return false;
    }
    lat = latlon[key]['lat'];
    lon = latlon[key]['lon'];

    // APIはenvにで管理
    const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
    const onecallAPI = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + API_KEY;

    // One call api test(3/5 これを使うことに決定。現在の11:00から一週間分の11:00のデータが表示される)
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
    console.log('-----------');
    console.log(onecall);
    console.log('-----------')

    // onecall apiで取得したdailyデータ
    let today = onecall[0].weather[0];
    let tomorr = onecall[1].weather[0];

    let todayIconUrl = "http://openweathermap.org/img/w/" + today.icon + ".png";
    let tomorrowIconUrl = "http://openweathermap.org/img/w/" + tomorr.icon + ".png";

    // 今日
    const todayResult = document.querySelector('.today');
    todayResult.textContent = '現在のの天気は ' + today.description + ' です。';
    document.querySelector('#today-icon').setAttribute('src', todayIconUrl);

    document.querySelector('.today-img').classList.remove('hidden');

    // 明日
    const tomorrowResult = document.querySelector('.tomorrow');
    tomorrowResult.textContent = '明日の天気は ' + tomorr.description + 'です。';
    document.querySelector('#tomorrow-icon').setAttribute('src', tomorrowIconUrl);

    document.querySelector('.tomorrow-img').classList.remove('hidden');

  };

  // 時間を表示するのであればJSTにするため、以下の関数を使う
  // const convertJST = (value) => {
  //   let time = new Date(value.dt_txt);
  //   time.setHours(time.getHours() + 9);
  //   return time.toLocaleString().slice(0,-3);
  // }

  return (
    <div className='container'>
        <label htmlFor='location'>現在地: </label>
        {/* セレクトボックスに変更する */}
        <Select options={options} name='select' className='pref-select' />
        <input type='text' id='location' name='location' placeholder='現在地を入力してください' />
        {/* <input type='button' value='送信' onClick={onClick} /> */}
        <button onClick={onClick}>検索</button>
      <div className='title'>
        <p>(天気予報の結果をここに表示する)</p>
      </div>
      <div className='result' id='result'>
        
        <div>
          <p className='today'></p>
          <img id="today-icon" className='today-img hidden' src="" alt="Weather icon"/>
        </div>

        <div>
          <p className='tomorrow'></p>
          <img id="tomorrow-icon" className='tomorrow-img hidden' src="" alt="Weather icon"/>
        </div>

      </div>
    </div>
  )
}

export default Home