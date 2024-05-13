import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamic-material-table',
  templateUrl: './dynamic-material-table.component.html',
  styleUrls: ['./dynamic-material-table.component.scss'],
})
export class DynamicMaterialTableComponent {

  @Input() dataSource: any[] = []; // Data to show


  constructor() { }

  getColumnNames(): string[] {
    if (this.dataSource.length === 0) {
      return [];
    }
    return Object.keys(this.dataSource[0]);
  }
}
