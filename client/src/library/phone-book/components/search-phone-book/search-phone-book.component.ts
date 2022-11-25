import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserQuery } from '../../models/user-query';
import { FormGroup, NgForm } from '@angular/forms';
import { PhoneBookService } from '../../services/phone-book-service.service';
import { InteractionService } from '../../services/interaction.service';
import { Subscription } from 'rxjs';
import { ViewChild } from '@angular/core';
import { UserRegister } from '../../models/user-register';

@Component({
  selector: 'app-search-phone-book',
  templateUrl: './search-phone-book.component.html',
  styleUrls: ['./search-phone-book.component.css'],
  providers: [PhoneBookService]
})
export class SearchPhoneBookComponent implements OnInit, OnDestroy {
  public userQuery: UserQuery = new UserQuery();
  // public dataList: UserQuery[];
  public dataList: UserRegister[];
  private subscription: Subscription;
  public toDisable: boolean;

  constructor(
    private phoneBookService: PhoneBookService,
    private interactionService: InteractionService
  ) { }

  ngOnInit() {
    this.onSubmit();
  }

  /**
   * Method to fetch the user data 
   */
  onSubmit(): void {
    this.subscription = this.phoneBookService.getUserData(this.userQuery.id, this.userQuery.firstName, this.userQuery.lastName, this.userQuery.email)
    .subscribe(res => {
      console.log(res);
      if (res.response && res.response.length > 0) {
        this.dataList = res.response;
        this.sendDataList(this.dataList);
      }
    },
    err => console.log(err));
  }

    /**
   * Method to clear the filter and reload the grid
   */
     onClear(): void {
      this.subscription = this.phoneBookService.getUserData()
      .subscribe(res => {
      if (res.response && res.response.length > 0) {
          this.userQuery.id = "";
          this.userQuery.firstName = "";
          this.userQuery.lastName = "";
          this.userQuery.email = "";
          this.dataList = res.response;
          this.sendDataList(this.dataList);
        }
      },
      err => console.log(err));
    }

  /**
   * Method to relay data to the sibling component.
   * @param userData Data that has to be sent to sibling component
   */
  private sendDataList (userData : UserRegister[]): void {
    this.interactionService.sendDataAccross(userData);
  }

  ngOnDestroy () {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
