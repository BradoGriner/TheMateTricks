import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserDTO } from '../Models/UserDTO';

@Injectable()
export class UserService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  RetrieveUsers() {
    return this.http.get<Array<UserDTO>>(/*this.baseUrl +*/ 'http://localhost:57629/api/users');
  }
}
