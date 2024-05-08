import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalLanguageSelectorComponent } from './modal-language-selector.component';

describe('ModalLanguageSelectorComponent', () => {
  let component: ModalLanguageSelectorComponent;
  let fixture: ComponentFixture<ModalLanguageSelectorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ModalLanguageSelectorComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalLanguageSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
