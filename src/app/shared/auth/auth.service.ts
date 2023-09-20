import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient,
              private router: Router) {
  }

  login(username: string, password: string) {
    const url = environment.urlBase + '/login'
    const body = {username: username, password: password}
    return this.http.post<any>(url, body)
      .pipe(map(response => {
          // login successful if there's a jwt token in the response
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('username', username);
          }
        }
      ));
  }

  isAuthenticated() {
    if (localStorage.getItem('token')) {
      // logged in so return true
      return true;
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login'])
  }
}
