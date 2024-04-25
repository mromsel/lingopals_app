import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from 'src/app/shared/interfaces/lesson.interface';
import { environment } from 'src/environments/environment';
import { LessonFull } from '../interfaces/lesson-full.interface';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  backendURL: string = environment.backendURL

  constructor(private http: HttpClient) { }

  getAllLessons(): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${this.backendURL}/lessons`)
  }

  getLesson(idLesson: number): Observable<LessonFull> {
    return this.http.get<LessonFull>(`${this.backendURL}/lessons/${idLesson}`)
  }
}
