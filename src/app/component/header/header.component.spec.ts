import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('HeaderComponent: should create', () => {
    expect(component).toBeTruthy();
  });

  it(`HeaderComponent: should have title as 'WEATHER FORECAST'.`, () => {
    
    expect(fixture.debugElement.nativeElement.innerText).toContain('WEATHER FORECAST');
  });

  it(`HeaderComponent: should have action`, () => {
    
    expect(fixture.debugElement.nativeElement.querySelector('button').innerText).toBe("Auto-refresh data in every 30 minutes");
    component.isTimerStarted = true;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('button').innerText).toBe("Stop auto-refreshing");
  });
});
