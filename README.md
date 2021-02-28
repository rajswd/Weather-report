# WeatherApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# About 

## Weather APP
- We will use Open Weather Data to create a single page application that presents a list of 5 European cities 

## Goal
- To get the current weather situation displaying the city name plus average temperature and the wind strength. Clicking on an item shows the forecast in the next hours.
- Also user can also add the favourite city to see the weather detial by clicking on Add button. Expectation is the city name should have atleast 3 characters long otherwise it will show an error message.
- By clicking on 'Weather Forecast' button in each card user can see the next hour weather details, which will show in dialogue.
- User also can set timer to refresh the weather data in every 30 minutes by clicking the button(i.e.  Auto-refresh data in every 30 minutes );
- Once the timer will start the action button will changes to ' Stop auto-refreshing ' button. By using this button we can stop the timer.
- There is another button, which appear after 'Add' button is responsible for refreshing the weather data at the same time.

## Tech
- Angular 11
- Bootstrap 4
- typescript
- To fetch weather data used weather api, i.e - https://home.openweathermap.org/
- Used RXJS library to consume/share data from service to component.
- Jasmine/Karma test for covering unit test.

# About me
- Name: Raj kumar singh
- Linkedin: https://www.linkedin.com/in/getsingh/
- email: raj.swd1@gmail.com

-Note: Please share feedback if you have any.

