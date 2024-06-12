import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from 'src/app/shared/interfaces/words-related/lesson.interface';
import { LessonFull } from '../interfaces/lesson-full.interface';
import { UserLanguages } from 'src/app/shared/interfaces/user-related/user-languages.interface';
import { LessonDisplay } from '../interfaces/lesson-display.interface';
import { backendURL } from 'src/app/shared/utils/environment';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  backendURL: string = backendURL

  constructor(private http: HttpClient) { }

  getAllLessons(): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${this.backendURL}/lessons`)
  }

  getLesson(idLesson: number, userLanguages: UserLanguages): Observable<LessonFull> {
    return this.http.get<LessonFull>(`${this.backendURL}/lessons/${idLesson}/${userLanguages.idUserLanguages}`)
  }

  getLessonsToDisplay(idUserLanguages: number): Observable<LessonDisplay[]> {
    return this.http.get<LessonDisplay[]>(`${this.backendURL}/lessons/display/${idUserLanguages}`)
  }
}
