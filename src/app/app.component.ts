import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { SharedService } from 'src/service/shared.service';
import { Subscription } from 'rxjs';
import { DialogueComponent } from './component/dialogue/dialogue.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{

  @ViewChild('appDialogue')
  private dialogue?: DialogueComponent;
  isLoading:boolean = true;
  private subscription: Subscription | undefined;
  bhSubjectList:any[] = [];

  toastMessage:any= {
    message:"",
    showToast:false,
    type:""
  };

  toastMessageId:any;
  interval:any;
  cityList:string[] = ["amsterdam", "barcelona", "berlin", "london", "paris"];

  constructor(private sharedService:SharedService){}

  ngOnInit(): void {
    this.subscribeService();
    this.getWetherList();
  }

/**
 * Responsible for subscribing service which send weather data
 */
  subscribeService(){

    this.subscription = this.sharedService.weatherData$.subscribe((data:any)=>{

                          const key:string = data.key.toLowerCase();

                          if(data && this.cityList.indexOf(key) > -1){
                            const weatherList = [...this.bhSubjectList];
                            weatherList[this.cityList.indexOf(key)] = data;
                            this.bhSubjectList = weatherList;
                          }

                          this.isLoading = false;
                        });

  }


/**
 * Responsible for triggering getWeatherList fn after every 30 Mins.
 */
  triggerInterval(){
    this.getWetherList();
    this.interval = window.setInterval(()=>{
      this.getWetherList();
    },1000*60*30);
  }

/**
 * Responsible for fetching data for citylist
 */
  getWetherList(){
    this.isLoading = true;
    this.cityList.forEach(city=>this.sharedService.getWeatherReportForCity(city));
  }

/**
 * Responsible for Add new city in the widgetList and fetch weather data for the new city.
 */
  addCity(cityEl:HTMLInputElement){
    const city = cityEl.value.toLowerCase();
    
    if(city.length > 2 && this.cityList.indexOf(city) < 0){
      this.cityList.push(city);
      this.sharedService.getWeatherReportForCity(city);
      cityEl.value ="";

    }else{
      const message = city.length < 3 ? 'City name must be more than three characters.' : 'City name is allready exist.';
      this.showToastMessage("warning", message);
    }
  }

  /**
   * Responsible for toggling interval event.
   */
  headerEvent(headerEventData:any){
    clearInterval(this.interval);
    if(headerEventData.flag)
      this.triggerInterval();
  }

  /**
   * Responsible for delete selected city for the widgetlist.
   */
  deleteCity(selectedCity:any){
    const index = this.cityList.indexOf(selectedCity.key);
    this.bhSubjectList.splice(index,1);
    const deltedData = this.cityList.splice(index,1);

    if(deltedData.length > 0){
      this.showToastMessage("success", `Success! ${selectedCity.name} City is deleted.`);
    }
  }

  /**
   * Responsible for finding the nearest next hour weather data from data list.
   */
  getNextHourWeatherData(list:any[]){
    let selectedForecastData;
    const hours = new Date().getHours();
    for(let i = 0 , l = list.length ; i < l ; i++){
        if(new Date(list[i].dt_txt).getHours() >= hours || new Date(list[i].dt_txt) > new Date()){
            selectedForecastData = list[i];
            i = l;
        }
    }
    return selectedForecastData;
  }

  /**
   * Responsible for 1. Open Forecast dialogue window. 2. trigger to get forecasting weather data.
   */
  openDlg(name:string) {
    this.isLoading = true;
    this.sharedService.getWeatherForecastData(name).subscribe(resData => {

      const forecastData = {...this.getNextHourWeatherData(resData.list), ...{city:resData.city}};
      
      if(forecastData){
        this.dialogue?.openDialogue({...forecastData});
      }
      this.isLoading = false;
      
    },err => {

      this.isLoading = false;
      this.showToastMessage("danger", "Sorr! Data is not found. Kindly try after some time.");
    });

  }  

  /**
   * Responsible for showing message to the user
   */
  showToastMessage(type:string, message:string,  isShown:boolean=true){
    clearTimeout(this.toastMessageId);
    this.toastMessage.type = type;
    this.toastMessage.message = message;
    this.toastMessage.showToast = isShown;

    this.toastMessageId = setTimeout(()=>{
      this.toastMessage.showToast = false;
    }, 2500);

  }

  /**
   * Responsible for removing subscriber
   */
  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe(); 
    }

  }
}
