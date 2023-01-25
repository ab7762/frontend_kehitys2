import { Component, Input } from '@angular/core';
import { CalendarService } from '../calendar.service';

@Component({
  selector: 'app-hatch',
  templateUrl: './hatch.component.html',
  styleUrls: ['./hatch.component.scss'],
})
export class HatchComponent {
  constructor(public calendarservice: CalendarService) {}
  // Otetaan vastaan arvoja calendar-komponentilta.
  @Input()
  value!: any;
  @Input()
  index!: any;
  @Input()
  kurt!: any;
  @Input()
  kalenteri!: boolean;
}
