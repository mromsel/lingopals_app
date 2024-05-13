import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.page.html',
  styleUrls: ['./admin-panel.page.scss'],
})
export class AdminPanelPage implements OnInit {

  backRoute: string = "../settings"

  dropdownParents: string[] = [
    "Masters",
    "Words related",
    "Users related"
  ]

  masters: string[] = [
    "activity-types",
    "grammatical-categories",
    "language-levels",
    "languages",
    "profiles",
    "writing-systems",
    "xp-levels"
  ]

  wordsRelated: string[] = [
    "word-references",
    "words"
  ]

  usersRelated: string[] = [
    "users",
    "users-progress"
  ]

  constructor() { }

  ngOnInit() {
  }

}
