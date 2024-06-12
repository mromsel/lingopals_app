import { Component, OnInit } from '@angular/core';
import { Lesson } from 'src/app/shared/interfaces/words-related/lesson.interface';
import { LessonsService } from './services/lessons.service';
import { Subject, takeUntil } from 'rxjs';
import { UserLanguages } from 'src/app/shared/interfaces/user-related/user-languages.interface';
import { ConfigService } from 'src/app/shared/services/app/config.service';
import { ModalUserLanguagesCreateComponent } from 'src/app/shared/components/modal-user-languages-create/modal-user-languages-create.component';
import { ModalController } from '@ionic/angular';
import { LessonDisplay } from './interfaces/lesson-display.interface';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.page.html',
  styleUrls: ['./lessons.page.scss'],
})
export class LessonsPage {

  unsubscribe$: Subject<void> = new Subject<void>();

  // lessons: Lesson[] = [];
  lessons: LessonDisplay[] = []

  preferredUserLanguages: UserLanguages | undefined;

  constructor(
    private lessonsService: LessonsService,
    private configService: ConfigService,
    private _modalController: ModalController,
  ) {
    this.preferredUserLanguages = this.configService.preferredUserLanguages
    // TODO REVISE
    if (this.preferredUserLanguages) {
      // this.openAddUserLanguagesModal()
      this.fetchLessonsToDisplay()
    }

    this.configService.preferredUserLanguagesSubject
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        preferredUserLanguages => {
          console.log("change preferred user languages");

          this.preferredUserLanguages = preferredUserLanguages
          this.fetchLessonsToDisplay()
        }
      )
  }

  fetchLessonsToDisplay() {
    if (this.preferredUserLanguages?.idUserLanguages) {
      this.lessonsService.getLessonsToDisplay(this.preferredUserLanguages?.idUserLanguages).subscribe(
        lessonDisplayList => {
          this.lessons = lessonDisplayList
        }
      )
    }
  }

  ionViewWillLeave() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  async openAddUserLanguagesModal() {
    const modal = await this._modalController.create({
      component: ModalUserLanguagesCreateComponent,
      keyboardClose: true,
    });
    return await modal.present();
  }
}
