import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from 'src/app/shared/interfaces/lesson.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  backendURL: string = environment.backendURL

  constructor(private http: HttpClient) { }

  getLesson(idLesson: number): Observable<Lesson> {
    return this.http.get<Lesson>(`${this.backendURL}/lessons/${idLesson}`)
  }
}
