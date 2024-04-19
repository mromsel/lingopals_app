import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { UserInfo } from 'src/app/shared/interfaces/user-info.interface';
import { UserProgress } from 'src/app/shared/interfaces/user-progress.interface';

@Component({
  selector: 'app-progress-modal',
  templateUrl: './progress-modal.component.html',
  styleUrls: ['./progress-modal.component.scss'],
})
export class ProgressModalComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal | undefined;

  @Input() userInfo: UserInfo | undefined;
  @Input() userProgress: UserProgress | undefined;

  constructor() { }

  ngOnInit() { }

  closeModal() {
    this.modal?.dismiss();
  }
}
