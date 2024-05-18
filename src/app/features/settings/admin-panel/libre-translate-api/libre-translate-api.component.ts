import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AdminPanelService } from '../services/admin-panel.service';
import { EventsService } from 'src/app/shared/services/events.service';
import { LibreTranslateRequest } from './libre-translate-request.interface';
import { LibreTranslateApiResponse } from './libre-translate-response.interface';

@Component({
  selector: 'app-libre-translate-api',
  templateUrl: './libre-translate-api.component.html',
  styleUrls: ['./libre-translate-api.component.scss'],
})
export class LibreTranslateApiComponent {

  @Input() inputValue: string = ""
  @Output() response = new EventEmitter<LibreTranslateApiResponse>()

  constructor(
    private adminPanelService: AdminPanelService,
    private eventsService: EventsService,
  ) { }

  translate() {
    console.log("translating")
    let libreTranslateDto: LibreTranslateRequest = {
      q: this.inputValue,
      source: "en",
      target: "es"
    }
    console.log(libreTranslateDto)
    this.eventsService.showSpinner$.next(true);
    this.adminPanelService.translateWithLibreTranslate(libreTranslateDto).subscribe(
      {
        next: (response) => {
          console.log(response)
          this.response.emit(response)
          this.eventsService.showSpinner$.next(false);
        },
        error: () => { this.eventsService.showSpinner$.next(false); }
      }
    )
  }
}
