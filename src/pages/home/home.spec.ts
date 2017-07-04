import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HomePage } from "./home";
import { IonicModule, Platform, NavController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PlatformMock, StatusBarMock, SplashScreenMock } from '../../../test-config/mocks-ionic';
import { FirebaseProvider } from "../../providers/firebase/firebase";
import "rxjs/add/observable/from";
import {FirebaseProviderMock} from "../../providers/firebase/firebase.testhelper";

describe('HomePage', () => {
  let titleDebugElement: DebugElement;
  let comp: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [
        IonicModule.forRoot(HomePage)
      ],
      providers: [
        NavController,
        { provide: FirebaseProvider, useClass: FirebaseProviderMock},
        { provide: Platform, useClass: PlatformMock},
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    comp = fixture.componentInstance;
    titleDebugElement = fixture.debugElement.query(By.css('.cell:not(.logo-img)'));
  });

  it('deve criar component', () => expect(comp).toBeDefined());

  it('deve ter titulo suas vacinas', () => {
    fixture.detectChanges();
    const titleElement = titleDebugElement.nativeElement;
    expect(titleElement.innerText).toBe("Suas Vacinas");
  });

});
