import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    private eventsService: EventsService
  ) { }

  ngOnInit(): void {
    this.eventsService.showSpinner$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        const overlay = document.getElementById('overlay')
        if (data) {
          if (overlay) { overlay.style.display = 'block'; }
          setTimeout(() => this.eventsService.showSpinner$.next(false), 300000);
        } else {
          if (overlay) { overlay.style.display = 'none'; }
        }
      })
  }

  ngOnDestroy() {
    this.unsubscribe$.next(0);
    this.unsubscribe$.complete();
  }
}
