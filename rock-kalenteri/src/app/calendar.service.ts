import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
// Tässä servicessä on suurin osa sovelluksen yleisistä toiminnoista. Myös pelin tila on täällä.
export class CalendarService {
  constructor() {}
  newGame() {
    // Kun uusi peli alkaa, pelin muuttujat alustetaan.
    if (this.account === 0) {
      return false;
    }
    this.kurt = [];
    this.lennon = [];
    this.king = [];
    this.kalenteri = true;
    this.values = [];
    this.createValues();
    this.voitto = 0;
    this.opens = 0;
    this.account = this.account - 2;
    return true;
  }
  kalenteri: boolean = false;
  values: any[] = [];
  opens: number = 0;
  voitto: number = 0;
  account: number = 0;
  user: string = '';
  salasana: string = '';
  id!: number;
  kurt: any[] = [];
  lennon: any[] = [];
  king: any[] = [];
  createValues() {
    let arvot = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24,
    ];
    for (const a of arvot) {
      this.values.push({
        value: a,
        status: 'default',
        picture: this.randomNumber(),
      });
    }
    return this.values;
  }
  randomNumber() {
    return Math.floor(Math.random() * 11);
  }
}
