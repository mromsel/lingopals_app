import { Component } from '@angular/core';
import { adminPanelDropdownParents, adminPanelMasters, adminPanelUsersRelated, adminPanelWordsRelated } from './interfaces/admin-panel-constants';
import { AdminPanelService } from './services/admin-panel.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.page.html',
  styleUrls: ['./admin-panel.page.scss'],
})
export class AdminPanelPage {

  backRoute: string = "../settings"

  dropdownParents: string[] = adminPanelDropdownParents

  masters: string[] = adminPanelMasters

  wordsRelated: string[] = adminPanelWordsRelated

  usersRelated: string[] = adminPanelUsersRelated

  constructor(
    private adminPanelService: AdminPanelService,
  ) {
    this.adminPanelService.fetchAllMasters()
    this.adminPanelService.fetchAllWordsRelated()
    // this.adminPanelService.fetchAllUsersRelated()
  }

}
