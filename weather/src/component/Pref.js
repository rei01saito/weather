import prefJson from '../pref.json'
import React from 'react';

function Pref() {

  let prefData = [];
  let prefLatLon = [];
  let result = [];
  let json = prefJson.marker;
  let i = 0;

  for (let item in json) {
    // console.log(json[item]);
    let obj = {
      value: i,
      label: json[item]['pref']
    }
    prefData.push(obj);

    let latlon = {
      key: i,
      lat: json[item]['lat'],
      lon: json[item]['lng']
    }
    prefLatLon.push(latlon);
    i++;
  }
  result.push(prefData);
  result.push(prefLatLon);
  return result;

}

export default Pref