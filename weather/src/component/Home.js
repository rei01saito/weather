import React from 'react'

function Home() {
  const onClick = () => {
    alert('送信されました。');
  };

  return (
    <div>
      <form>
        <label for='location'>現在地: </label>
        <input type='text' id='location' name='location' placeholder='現在地を入力してください' />
        <input type='button' value='送信' onClick={onClick} />
      </form>
      <div className='result'>(天気予報の結果をここに表示する)</div>
    </div>
  )
}

export default Home