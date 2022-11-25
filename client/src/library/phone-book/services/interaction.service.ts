import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { UserQuery } from '../models/user-query';
import { UserRegister } from '../models/user-register';


@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  private messageRelayer: Subject<UserRegister[]> = new Subject<UserRegister[]>();
  public getRelayedMessage$: Observable<UserRegister[]> = this.messageRelayer.asObservable();

  constructor() { }

  /**
   * Method to push data to subscribing component
   * @param data to be relayed to subscribing class component
   */
  public sendDataAccross (data : UserRegister[]) {
    this.messageRelayer.next(data);
  }

}
