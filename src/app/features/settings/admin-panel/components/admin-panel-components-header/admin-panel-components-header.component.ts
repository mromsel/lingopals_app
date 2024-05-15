import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-admin-panel-components-header',
  templateUrl: './admin-panel-components-header.component.html',
  styleUrls: ['./admin-panel-components-header.component.scss'],
})
export class AdminPanelComponentsHeaderComponent {
  @Input() hasAdvancedSearch: boolean = false;

  @Output() toggleShowForm = new EventEmitter<any>;
  @Output() toggleShowSearchBar = new EventEmitter<any>;
  @Output() advancedForm = new EventEmitter<any>;

  showForm: boolean = false;
  showSearchBar: boolean = false;

  constructor() { }

  pressedToggleShowForm() {
    this.toggleShowForm.next(null);
  }

  pressedToggleShowSearchBar() {
    this.toggleShowSearchBar.next(null);
  }

  goToAdvancedForm() {
    this.advancedForm.next(null);
  }
}
