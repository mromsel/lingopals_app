import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from 'src/app/shared/interfaces/lesson.interface';
import { environment } from 'src/environments/environment';
import { LessonFull } from '../interfaces/lesson-full.interface';
import { UsersLanguages } from 'src/app/shared/interfaces/users-languages.interface';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  backendURL: string = environment.backendURL

  constructor(private http: HttpClient) { }

  getAllLessons(): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${this.backendURL}/lessons`)
  }

  getLesson(idLesson: number, userLanguages: UsersLanguages): Observable<LessonFull> {
    return this.http.get<LessonFull>(`${this.backendURL}/lessons/${idLesson}/${userLanguages.languageOrigin.isoCode}/${userLanguages.languageTarget.isoCode}`)
  }
}
