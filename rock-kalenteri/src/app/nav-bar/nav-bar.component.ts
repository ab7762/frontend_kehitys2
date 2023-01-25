import { Component } from '@angular/core';
import { CalendarService } from '../calendar.service';
import { CalendarComponent } from '../calendar/calendar.component';
import { AuthService } from '../auth.service';
import { user } from '../user';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  constructor(
    public calendarservice: CalendarService,
    public authservice: AuthService
  ) {}
  users: user[] = [];

  ngOnInit() {
    this.getUsers();
  }
  getUsers(): void {
    this.authservice.getUsers().subscribe((users) => (this.users = users));
  }
  ostaKalenteri() {
    this.calendarservice.newGame();
  }
  // Kirjautuessa ulos päivitetään kantaan tiedot.
  logOut() {
    this.save(
      this.calendarservice.user,
      this.calendarservice.salasana,
      this.calendarservice.account
    );
    this.authservice.isLogged = false;
    this.calendarservice.kalenteri = false;
    this.calendarservice.user = '';
    this.calendarservice.salasana = '';
    this.calendarservice.id = 0;
    this.calendarservice.account = 0;
    this.calendarservice.opens = 0;
    this.getUsers();
  }
  add(ktunnus: string, salasana: string | number, account: number): void {
    this.authservice
      .addUser({
        ktunnus: ktunnus,
        salasana: salasana,
        saldo: account,
      } as user)
      .subscribe((user) => {
        this.users.push(user);
      });
  }
  // Metodi kannan päivittämiseen.
  save(ktunnus: string, salasana: string, account: number): void {
    this.authservice
      .updateUser({
        id: 1,
        ktunnus: ktunnus,
        salasana: salasana,
        saldo: account,
      } as user)
      .subscribe();
  }
}
