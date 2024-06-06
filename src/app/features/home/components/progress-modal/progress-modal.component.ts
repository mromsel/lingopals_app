import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { UserProgress } from 'src/app/shared/interfaces/user-related/user-progress.interface';
import { User } from 'src/app/shared/interfaces/user-related/user.interface';

@Component({
  selector: 'app-progress-modal',
  templateUrl: './progress-modal.component.html',
  styleUrls: ['./progress-modal.component.scss'],
})
export class ProgressModalComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal | undefined;

  @Input() user: User | undefined;
  @Input() userProgress: UserProgress | undefined;

  constructor() { }

  ngOnInit() { }

  closeModal() {
    this.modal?.dismiss();
  }
}
