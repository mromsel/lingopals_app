import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Language } from '../interfaces/masters/language.interface';
import { LanguageLevel } from '../interfaces/masters/language-level.interface';
import { Masters } from 'src/app/features/settings/admin-panel/interfaces/masters.interface';
import { ActivityType } from '../interfaces/masters/activity-type.interface';
import { GrammaticalCategory } from '../interfaces/masters/grammatical-category.interface';
import { WritingSystem } from '../interfaces/masters/writing-system.interface';
import { XPLevel } from '../interfaces/masters/xp-level.interface';
import { Profile } from '../interfaces/masters/profile.interface';
import { Subject } from 'rxjs';
import { backendURL } from '../utils/environment';
import { SemanticCategory } from '../interfaces/masters/semantic-category.interface';

@Injectable({
  providedIn: 'root'
})
export class MastersService {

  backendURL: string = backendURL

  isDataReady = new Subject<boolean>()

  constructor(private http: HttpClient) { }

  activityTypes: ActivityType[] = []
  grammaticalCategories: GrammaticalCategory[] = []
  languages: Language[] = []
  languageLevels: LanguageLevel[] = []
  profiles: Profile[] = []
  semanticCategories: SemanticCategory[] = []
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
        this.semanticCategories = masters.semanticCategories
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
