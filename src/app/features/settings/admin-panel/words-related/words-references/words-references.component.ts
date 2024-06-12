import { Component, OnInit } from '@angular/core';
import { WordReference } from 'src/app/shared/interfaces/words-related/word-reference.interface';
import { AdminPanelService } from '../../services/admin-panel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-words-references',
  templateUrl: './words-references.component.html',
  styleUrls: ['./words-references.component.scss'],
})
export class WordsReferencesComponent implements OnInit {

  routeToNavigateOnAdvancedSearch = 'app/settings/admin-panel/words-related/word-references/form'

  data: WordReference[] = [];

  displayedColumns: string[] = ['idWordRef', 'englishWord', 'englishDefinition', 'grammaticalCategory', 'languageLevel', 'semanticCategory', 'actions']; //private String imageUrl; 'category'

  displayList: WordReference[] = [];

  public showForm: boolean = false
  public showSearchBar: boolean = false

  constructor(
    private adminPanelService: AdminPanelService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.adminPanelService.getResource("word-references").subscribe(
      data => {
        this.data = data
        this.displayList = [...this.data]
      }
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

  action() { }

  onSearch(event: any) {
    const searchTerm: string = event.target.value;

    this.displayList = this.data.filter(item => item.englishWord.includes(searchTerm))
  }

  goToAdvancedForm() {
    let data = this.data
    this.router.navigate([this.routeToNavigateOnAdvancedSearch], { state: { data } });
  }
}
