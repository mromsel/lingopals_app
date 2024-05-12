import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit {

  backRoute: string = "../settings"

  dropdownParents: string[] = [
    "Masters",
    "Words related",
    "Users related"
  ]

  masters: string[] = [
    "activity-types",
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

  ngOnInit() { }

}
