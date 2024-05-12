import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminPanelService {

  backendURL: string = environment.backendURL

  constructor(private http: HttpClient) { }

  getResource(resource: string) {
    return this.http.get<any>(`${this.backendURL}/${resource}`)
  }
}
