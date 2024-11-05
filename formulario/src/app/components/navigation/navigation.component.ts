import {Component} from '@angular/core';
import {environment} from "../../../environments/environment";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  isAdmin: boolean = false;

  constructor(public authService: AuthService) {
    this.username = localStorage.getItem(environment.USERNAME);
    if (localStorage.getItem(environment.ADMIN)) {
      this.isAdmin = true;
    }
  }


  username: string | null;

  logout() {
    this.authService.logout();
  }

}
