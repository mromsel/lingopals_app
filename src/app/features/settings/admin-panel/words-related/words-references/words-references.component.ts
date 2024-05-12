import { Component, OnInit } from '@angular/core';
import { WordReference } from 'src/app/shared/interfaces/word-reference.interface';
import { AdminPanelService } from '../../services/admin-panel.service';

@Component({
  selector: 'app-words-references',
  templateUrl: './words-references.component.html',
  styleUrls: ['./words-references.component.scss'],
})
export class WordsReferencesComponent implements OnInit {

  data: WordReference[] = [];

  displayedColumns: string[] = ['idWordRef', 'englishWord', 'languageLevel', 'category']; //private String imageUrl;

  public showForm: boolean = false
  public showSearchBar: boolean = false

  constructor(
    private adminPanelService: AdminPanelService,
  ) { }

  ngOnInit() {
    this.adminPanelService.getResource("word-references").subscribe(
      data => this.data = data
    )
  }

  toggleShowForm() {
    this.showForm = !this.showForm
    if (this.showForm) {
      this.showSearchBar = false
    }
  }

  toggleShowSearchBar() {
    this.showSearchBar = !this.showSearchBar
    if (this.showSearchBar) {
      this.showForm = false
    }
  }

}
