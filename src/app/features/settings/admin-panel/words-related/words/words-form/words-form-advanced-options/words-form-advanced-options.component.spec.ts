import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WordsFormAdvancedOptionsComponent } from './words-form-advanced-options.component';

describe('WordsFormAdvancedOptionsComponent', () => {
  let component: WordsFormAdvancedOptionsComponent;
  let fixture: ComponentFixture<WordsFormAdvancedOptionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WordsFormAdvancedOptionsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WordsFormAdvancedOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
