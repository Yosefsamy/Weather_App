import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private _httpClient : HttpClient) { }

  key:string = "a32bc57e73c040bfb6c133330242010"

  getWeather(city:string):Observable<any>{
    return this._httpClient.get(`http://api.weatherapi.com/v1/forecast.json?key=${this.key}&q=${city}&days=3&aqi=no&alerts=no`)
  }

}
