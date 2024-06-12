import { Injectable } from '@angular/core';
import { UserActivity } from '../../interfaces/user-related/user-activity.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLevelUpdate } from 'src/app/features/lessons/interfaces/user-level-update.interface';
import { backendURL } from '../../utils/environment';

@Injectable({
  providedIn: 'root'
})
export class UserActivityService {

  backendURL: string = backendURL

  constructor(private http: HttpClient) { }

  getUserActivities(idUser: number) {
    return this.http.get<Observable<UserActivity[]>>(`${this.backendURL}/users-activities/${idUser}`)
  }

  submitUserActivity(userActivity: UserActivity): Observable<UserLevelUpdate> {
    return this.http.post<UserLevelUpdate>(`${this.backendURL}/users-activities`, userActivity)
  }
}
