import React from 'react'
import './Home.css'

function Home() {
  const onClick = async() => {
    let lat = 36;
    let lon = 140;
    const API_KEY = '167104da34f3de46ddfebdd2d4a09155'; // 後に.envを作ってgithubに公開しないようにする
    const weatherAPI = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + API_KEY;
    let weather = await fetch(weatherAPI,{
      method: 'GET',
      mode: 'cors'
    })
    .then(response => response.json())
    .then(data => data.list);

    const result = document.querySelector('#result');

    Object.values(weather).forEach(value => {
      const element = document.createElement('div');
      element.classList.add('weather-list');
      element.textContent = value["weather"][0]["description"];
      result.append(element);
    });
  };

  return (
    <div className='container'>
      <form>
        <label htmlFor='location'>現在地: </label>
        <input type='text' id='location' name='location' placeholder='現在地を入力してください' />
        <input type='button' value='送信' onClick={onClick} />
      </form>
      <div className='title'>
        <p>(天気予報の結果をここに表示する)</p>
      </div>
      <div className='result' id='result'>
      </div>
    </div>
  )
}

export default Home