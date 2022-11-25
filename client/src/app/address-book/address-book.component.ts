import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserQuery } from 'src/library/phone-book/models/user-query';
import { UserRegister } from 'src/library/phone-book/models/user-register';
import { InteractionService } from 'src/library/phone-book/services/interaction.service';
import { PhoneBookService } from 'src/library/phone-book/services/phone-book-service.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.css'],
  providers: [PhoneBookService, MessageService]

})
export class AddressBookComponent implements OnInit {
  public userRegister: UserRegister = new UserRegister();
  public userRegisterForm: NgForm;
  public showToast: boolean = false;

  constructor(
    private phoneBookService: PhoneBookService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
  }

  onRegister() {
    if (this.userRegister && Object.values(this.userRegister) && !Object.values(this.userRegister).every(val => val === null)) {
      const requestPayload = Object.assign({}, this.userRegister);
      requestPayload.gender = "";
      requestPayload.profilePic = "";
      requestPayload.techStack = (requestPayload.techStack as string).split(',') as [];
      console.log('requestPayload', requestPayload)
      this.phoneBookService.registerUser(this.userRegister).subscribe(res => {
        console.log(res);
        this.onClear();
        this.addSingle()
        setTimeout(() => {
          this.clear();
        }, 10000)
      }, err => console.log(err));
    }
  }

  addSingle() {
    this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
}
clear() {
  this.messageService.clear();
}

	resetUserForm(form: NgForm) {
		form.resetForm();
	}

  onClear() {
    for (const key in this.userRegister) {
      if (Object.prototype.hasOwnProperty.call(this.userRegister, key)) {
        this.userRegister[key] = "";
      }
    }
  }

}
