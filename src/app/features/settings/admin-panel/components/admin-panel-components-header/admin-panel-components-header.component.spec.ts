import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminPanelComponentsHeaderComponent } from './admin-panel-components-header.component';

describe('AdminPanelComponentsHeaderComponent', () => {
  let component: AdminPanelComponentsHeaderComponent;
  let fixture: ComponentFixture<AdminPanelComponentsHeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPanelComponentsHeaderComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPanelComponentsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
