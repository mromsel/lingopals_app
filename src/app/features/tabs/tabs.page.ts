import { Component, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage {

  @ViewChild('tabs', { static: false }) tabs: IonTabs | undefined;

  constructor() { }

  ionViewDidEnter() {
    this.tabs?.ionTabsDidChange.subscribe(() => {
      this.updateTabSelection();
    });
    this.updateTabSelection();
  }
  updateTabSelection() {
    const selectedTab = this.tabs?.getSelected();
    const tabButtons = document.querySelectorAll('ion-tab-button');
    tabButtons.forEach((tabButton) => {
      if (tabButton.getAttribute('tab') === selectedTab) {
        tabButton.classList.add('tab-button-selected');
      } else {
        tabButton.classList.remove('tab-button-selected');
      }
    });
  }
}
