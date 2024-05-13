import { Component, OnInit } from '@angular/core';
import { AdminPanelService } from '../services/admin-panel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { adminPanelMasters } from '../interfaces/admin-panel-constants';

@Component({
  selector: 'app-masters',
  templateUrl: './masters.component.html',
  styleUrls: ['./masters.component.scss'],
})
export class MastersComponent implements OnInit {

  masters: string[] = adminPanelMasters

  masterData: any[] = []
  displayList: any[] = [];
  displayColumns: any[] = []

  currentMaster: string = ""
  selectedProperty: string = ""


  public showForm: boolean = false
  public showSearchBar: boolean = true

  constructor(
    private adminPanelService: AdminPanelService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const type = params.get('type');
      if (type) {
        this.currentMaster = type
        this.adminPanelService.getResource(type).subscribe(
          data => {
            this.masterData = data
            this.displayList = data
            console.log(this.masterData)
            this.displayColumns = this.getColumnNames()
            console.log(this.displayColumns)

            if (this.displayColumns && this.displayColumns.length > 0) {
              this.selectedProperty = this.displayColumns[0];
            }
          }
        )
      }
    });
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
    const searchTerm = event.target.value;
    this.displayList = this.masterData.filter(item => item[this.selectedProperty].toLowerCase().includes(searchTerm.toLowerCase()))

    console.log(this.displayList)
    console.log(this.selectedProperty)
  }

  onSelectChange(event: any) {
    this.selectedProperty = event.detail.value;
    console.log(this.selectedProperty)
  }

  /** Method to obtain column names depending on objects in property masterData*/
  getColumnNames(): string[] {
    if (this.masterData.length === 0) {
      return [];
    }
    // Get properties from first element in array
    return Object.keys(this.masterData[0]);
  }

  changeMaster(master: string) {
    this.router.navigate([`app/settings/admin-panel/masters/${master}`])
  }

}
