import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalUserLanguagesCreateComponent } from './modal-user-languages-create.component';

describe('ModalUserLanguagesCreateComponent', () => {
  let component: ModalUserLanguagesCreateComponent;
  let fixture: ComponentFixture<ModalUserLanguagesCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalUserLanguagesCreateComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalUserLanguagesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
