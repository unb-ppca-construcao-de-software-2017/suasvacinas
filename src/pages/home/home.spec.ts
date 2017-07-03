import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HomePage } from "./home";
import { IonicModule, Platform, NavController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PlatformMock, StatusBarMock, SplashScreenMock } from '../../../test-config/mocks-ionic';
import { FirebaseProvider } from "../../providers/firebase/firebase";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import "rxjs/add/observable/from";

describe('HomePage', () => {
  let de: DebugElement;
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
    de = fixture.debugElement.query(By.css('h3'));
  });

  it('should create component', () => expect(comp).toBeDefined());

  it('should have expected <h3> text', () => {
    fixture.detectChanges();
    const h3 = de.nativeElement;
    expect(h3.innerText).toMatch(/ionic/i,
      '<h3> should say something about "Ionic"');
  });

});

class FirebaseProviderMock extends FirebaseProvider {

  private vacinas: BehaviorSubject<any>;

  getVacinas(): Observable<any[]> {
    return this.vacinas;
  }

  addVacina(name: string): void {
    this.vacinas.next(name);
  }

  removeVacina(id: string): void {
    // nada
  }
}
