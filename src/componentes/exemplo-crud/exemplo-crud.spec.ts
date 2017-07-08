import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ExemploCrudPage } from "./exemplo-crud";
import { IonicModule, Platform, NavController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PlatformMock, StatusBarMock, SplashScreenMock } from '../../../test-config/mocks-ionic';
import { FirebaseProvider } from "../../firebase/firebase";
import "rxjs/add/observable/from";
import {FirebaseProviderMock} from "../../firebase/firebase.testhelper";
import {VacinasNavbarComponent} from "../vacinas-navbar/vacinas-navbar.component";

describe('ExemploCrudPage', () => {

  let titleDebugElement: DebugElement;
  let comp: ExemploCrudPage;
  let fixture: ComponentFixture<ExemploCrudPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExemploCrudPage, VacinasNavbarComponent],
      imports: [
        IonicModule.forRoot(ExemploCrudPage)
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
    fixture = TestBed.createComponent(ExemploCrudPage);
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
