import { Component, OnInit } from '@angular/core';
import { Lesson } from 'src/app/shared/interfaces/words-related/lesson.interface';
import { LessonsService } from './services/lessons.service';
import { Subject, takeUntil } from 'rxjs';
import { UserLanguages } from 'src/app/shared/interfaces/user-related/user-languages.interface';
import { ConfigService } from 'src/app/shared/services/app/config.service';
import { ModalUserLanguagesCreateComponent } from 'src/app/shared/components/modal-user-languages-create/modal-user-languages-create.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.page.html',
  styleUrls: ['./lessons.page.scss'],
})
export class LessonsPage {

  unsubscribe$: Subject<void> = new Subject<void>();

  lessons: Lesson[] = [];

  preferredUserLanguages: UserLanguages | undefined;

  constructor(
    private lessonsService: LessonsService,
    private configService: ConfigService,
    private _modalController: ModalController,
  ) { }

  ionViewWillEnter() {

    this.preferredUserLanguages = this.configService.preferredUserLanguages
    if (!this.preferredUserLanguages) {
      this.openAddUserLanguagesModal()
    }

    this.configService.preferredUserLanguagesSubject
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        preferredUserLanguages => {
          this.preferredUserLanguages = preferredUserLanguages
        }
      )

    this.lessonsService.getAllLessons()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(lessons => {
        let lesson = lessons[0]
        // AUX
        for (let index = 0; index < 10; index++) {
          let auxLesson = structuredClone(lesson)
          auxLesson.idLesson = index
          auxLesson.lessonName = "Lesson " + index
          this.lessons.push(auxLesson)
        }
        this.lessons[0].isCompleted = true //DEBUG
      })
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
