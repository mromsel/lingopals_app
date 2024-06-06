import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Language } from '../interfaces/language.interface';
import { LanguageLevel } from '../interfaces/language-level.interface';
import { Masters } from 'src/app/features/settings/admin-panel/interfaces/masters.interface';
import { ActivityType } from '../interfaces/activity-type.interface';
import { GrammaticalCategory } from '../interfaces/grammatical-category.interface';
import { WritingSystem } from '../interfaces/writing-system.interface';
import { XPLevel } from '../interfaces/xp-level.interface';
import { Profile } from '../interfaces/profile.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MastersService {

  backendURL: string = environment.backendURL

  isDataReady = new Subject<boolean>()

  constructor(private http: HttpClient) { }

  activityTypes: ActivityType[] = []
  grammaticalCategories: GrammaticalCategory[] = []
  languages: Language[] = []
  languageLevels: LanguageLevel[] = []
  profiles: Profile[] = []
  writingSystems: WritingSystem[] = []
  xpLevels: XPLevel[] = []

  fetchBasicMasters() {

    this.http.get<Masters>(`${this.backendURL}/masters`).subscribe(
      masters => {
        this.activityTypes = masters.activityTypes
        this.grammaticalCategories = masters.grammaticalCategories
        this.languages = masters.languages
        this.languageLevels = masters.languageLevels
        this.profiles = masters.profiles
        this.writingSystems = masters.writingSystems
        this.xpLevels = masters.xpLevels

        this.isDataReady.next(true)
      }
    )
  }

  getLanguages(): Language[] {
    return this.languages
  }

}
