import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserQuery } from '../models/user-query';
import { UserRegister, UserRegisterResponse } from '../models/user-register';

@Injectable({
  providedIn: 'root'
})
export class PhoneBookService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * This service is to get the user data based on the search
   * @param ID of the user
   * @param firstName firstname of the user
   * @param lastName lastName of the user
   * @param email email of the user
   * @returns data stream of type UserQuery[]
   */
  getUserData (ID?: string, firstName?: string, lastName?: string, email?: string): Observable<UserRegisterResponse> {
    let url = 'http://localhost:4500/resource';
    if (firstName || lastName || email || ID) url += '?';
    if (firstName) url += `firstName=${firstName}`;
    if (ID) url += `&empId=${ID}`;
    if (lastName) url += `&lastName=${lastName}`;
    if (email) url += `&email=${email}`;
    console.log(url)
    return this.http.get<UserRegisterResponse>(url).pipe(
      catchError(this.errorHandler)
    )
  }

  

  /**
 * This service is to register the user
 * @param register info of the user
 */
  registerUser(userRegister: UserRegister) {
    let url = 'http://localhost:4500/resource';
    return this.http.post<UserRegister[]>(url, userRegister).pipe(
      catchError(this.errorHandler)
    )
  }

  private errorHandler (error: HttpErrorResponse) {
    return throwError(error);
  }
  
}
