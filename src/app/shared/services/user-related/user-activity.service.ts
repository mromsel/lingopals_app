import { Injectable } from '@angular/core';
import { UserActivity } from '../../interfaces/user-related/user-activity.interface';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLevelUpdate } from 'src/app/features/lessons/interfaces/user-level-update.interface';

@Injectable({
  providedIn: 'root'
})
export class UserActivityService {

  backendURL: string = environment.backendURL

  constructor(private http: HttpClient) { }

  getUserActivities(idUser: number) {
    return this.http.get<Observable<UserActivity[]>>(`${this.backendURL}/users-activities/${idUser}`)
  }

  submitUserActivity(userActivity: UserActivity): Observable<UserLevelUpdate> {
    return this.http.post<UserLevelUpdate>(`${this.backendURL}/users-activities`, userActivity)
  }
}
