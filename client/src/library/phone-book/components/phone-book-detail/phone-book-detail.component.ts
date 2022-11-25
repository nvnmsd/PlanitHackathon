import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserQuery } from '../../models/user-query';
import { PhoneBookService } from '../../services/phone-book-service.service';
import { Location } from '@angular/common';
import { UserRegister } from '../../models/user-register';

@Component({
  selector: 'app-phone-book-detail',
  templateUrl: './phone-book-detail.component.html',
  styleUrls: ['./phone-book-detail.component.css']
})
export class PhoneBookDetailComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public selectedUserData: UserRegister;

  constructor(
    private activateRoute: ActivatedRoute,
    private phoneBookService: PhoneBookService,
    public location: Location
  ) { }

  ngOnInit() {
    this.getSelectedUser();
  }

  /**
   * Method to get the user details based on the ID.
   */
  private getSelectedUser (): void {
    this.activateRoute.paramMap.subscribe(res => {
      const userName = res.get('ID');
      this.getUserDetail(userName);
    },
    err => console.log(err))
  }

  /**
   * Method to fetch the user details through API.
   * @param user selected User Name
   */
  private getUserDetail (user: string): void {
    this.subscription = this.phoneBookService.getUserData(user).subscribe(res => {
      const response = res.response[0];
      response.techStack =  typeof response.techStack !== 'string' ? JSON.parse(response.techStack) : response.techStack.split(',');
      this.selectedUserData = Object.assign({}, response);
      console.log(this.selectedUserData)
    })
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
