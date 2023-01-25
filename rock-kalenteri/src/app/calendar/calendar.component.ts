import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../calendar.service';
import { animate, transition, trigger, style } from '@angular/animations';
// Animaation teko. FadeIn tyylillä tulee sisään.
const enterTransition = transition(':enter', [
  style({
    opacity: 0,
  }),
  animate('1s ease-in', style({ opacity: 1 })),
]);
const fadeIn = trigger('fadeIn', [enterTransition]);
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  animations: [fadeIn],
})
export class CalendarComponent implements OnInit {
  constructor(public calendarservice: CalendarService) {}

  ngOnInit() {}
  // Logiikkaa kalenteriin. Todennäköisyys kuville on numeroitu 1 - 10. Osuneen numeron
  // perusteella ehdollinen tyyli tuottaa vastaavan kuvan kalenteriin. Sitten lisätään omaan
  // taulukkoon, joka laskee mahdollisen voiton. Default on kansikuva kaikille luukuille. Voitto lisätään
  // automaattisesti viimeisen luukun jälkeen tilin saldoon.
  pressButton(index: number) {
    if (
      this.calendarservice.values[index].status === 'default' &&
      this.calendarservice.values[index].picture < 5
    ) {
      this.calendarservice.values[index].status = 'logo';
      this.calendarservice.opens++;
    }
    if (
      this.calendarservice.values[index].status === 'default' &&
      this.calendarservice.values[index].picture > 4 &&
      this.calendarservice.values[index].picture < 8
    ) {
      this.calendarservice.values[index].status = 'kurt';
      this.calendarservice.kurt.push(this.calendarservice.values[index]);
      if (this.calendarservice.kurt.length === 7) {
        this.calendarservice.voitto = this.calendarservice.voitto + 2;
      }
      this.calendarservice.opens++;
    }
    if (
      this.calendarservice.values[index].status === 'default' &&
      this.calendarservice.values[index].picture > 7 &&
      this.calendarservice.values[index].picture < 10
    ) {
      this.calendarservice.values[index].status = 'lennon';
      this.calendarservice.lennon.push(this.calendarservice.values[index]);
      if (this.calendarservice.lennon.length === 8) {
        this.calendarservice.voitto = this.calendarservice.voitto + 1000;
      }
      this.calendarservice.opens++;
    }
    if (
      this.calendarservice.values[index].status === 'default' &&
      this.calendarservice.values[index].picture === 10
    ) {
      this.calendarservice.values[index].status = 'king';
      this.calendarservice.king.push(this.calendarservice.values[index]);
      if (this.calendarservice.king.length === 10) {
        this.calendarservice.voitto = this.calendarservice.voitto + 10000;
      }
      this.calendarservice.opens++;
    }
    if (this.calendarservice.opens == 24) {
      this.calendarservice.account =
        this.calendarservice.voitto + this.calendarservice.account;
      this.calendarservice.kalenteri = false;
    }
    if (this.calendarservice.values[index].status !== 'default') {
      return false;
    }

    return true;
  }
}
