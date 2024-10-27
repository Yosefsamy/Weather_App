import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../Core/Services/weather.service';
import { Forecastday, Hour, Location } from '../../Core/Interfaces/weather';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private _weatherService : WeatherService){}
  location:Location = {} as Location
  forecastDay:Forecastday[] = []
  Hours: Hour[] = []
  today : Date = new Date()
  day : number = this.today.getDate();
  month : string = this.getMonth()
  valid:boolean = true

  monthName:string = ""

  
  ngOnInit(): void {
    // this.getWeather("Alexandria")
    this.currentLocation()
  }

  getMonth(): string {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthNames[this.today.getMonth()]; // Get the month name based on the current month index
}

  getDayName(dateString: string): string {
  const date = new Date(dateString); // Create a Date object
  return date.toLocaleDateString('en-US', { weekday: 'long' }); // Get the day name
}

  getWeather(city:string){
    this._weatherService.getWeather(city).subscribe({
      next: (res)=>{
        // console.log(res);
        this.location = res.location
        this.forecastDay = res.forecast.forecastday
        this.Hours = res.forecast.forecastday[0].hour
        this.Hours = this.Hours.map(item => {
          const date = new Date(item.time); // Create a Date object
          const hours = date.getHours(); // Get the hours in 24-hour format
          return {
            ...item, // Spread the existing properties of the item
            hours // Add the new hours property
          };
        });
        
        this.valid = true
      },
      error: (err)=>{
        // console.log(err);
        this.valid = false
      }
    })
  }

  GetCityWeather(cityName:string){
    this.getWeather(cityName)
  }


  suc(pos:any){
    const position = (pos.coords.latitude) + ',' + (pos.coords.longitude);
    // console.log(pos.coords);
    // console.log(position);
    this.getWeather(position); //* Pass parameter to display() function *//

}


//& Declare function Error &//
  error(){
    window.alert("Accessed Denny")
}

//& Declare function currentLocation() ==== Get Current Location &//
currentLocation(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => this.suc(pos), 
      (err) => this.error()   
    );
  } 
  else {
    window.alert("Geolocation is not supported by this browser.");
  }
}

}
