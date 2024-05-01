import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalSingleLanguageSelectorComponent } from './modal-single-language-selector.component';

describe('ModalSingleLanguageSelectorComponent', () => {
  let component: ModalSingleLanguageSelectorComponent;
  let fixture: ComponentFixture<ModalSingleLanguageSelectorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSingleLanguageSelectorComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalSingleLanguageSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
