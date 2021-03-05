import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { IWeatherData } from '../interface/IweatherData';
import { CITY_WEATHER_DATA } from 'src/mockData/MoclData';
import { cold } from 'jasmine-marbles';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('CardComponent: should create', () => {
    expect(component).toBeTruthy();
  });

  it('CardComponent: should have render the card with correct data label', () => {
    const city = 'barcelona';
    const data: IWeatherData = {...CITY_WEATHER_DATA, ...{key: city, isSuccess: true}};

    component.cityReport = data;
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.querySelector('.card.card-columns')).toBeTruthy();
    expect(fixture.debugElement.nativeElement.innerText).toContain(data.name.toLocaleUpperCase());
    expect(fixture.debugElement.nativeElement.innerText).toContain('Avg Temparature');
    expect(fixture.debugElement.nativeElement.innerText).toContain('Wind strength');
  });

  it('CardComponent: should have render action button and emit @Output for weather forecast', () => {
    const city = 'barcelona';
    const data: IWeatherData = {...CITY_WEATHER_DATA, ...{key: city, isSuccess: true}};
    component.cityReport = data;

    fixture.detectChanges();
    const actionButton = fixture.debugElement.nativeElement.querySelector('button.btn-warning');
    expect(actionButton).toBeTruthy();
    expect(actionButton.innerText).toBe('Weather Forecast');

    spyOn(component.handleWeatherForcast, 'emit');
    actionButton.click();
    fixture.detectChanges();
    expect(component.handleWeatherForcast.emit).toHaveBeenCalledWith(city);

  });

  it('CardComponent: @Output should have call for the delete the card ', () => {
    const city = 'barcelona';
    const data: IWeatherData = {...CITY_WEATHER_DATA, ...{key: city, isSuccess: true}};
    component.cityReport = data;

    fixture.detectChanges();
    const actionButton = fixture.debugElement.nativeElement.querySelector('[aria-label=Close]');
    expect(actionButton).toBeTruthy();

    const expectedMarbles = '-b|';

    spyOn(component.clickDeleteWidget, 'emit');
    actionButton.click();
    fixture.detectChanges();
    expect(component.clickDeleteWidget.emit).toHaveBeenCalledWith({key: data.key, name: data.name});

  });

});
