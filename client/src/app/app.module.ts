import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhoneBookModule } from '../library/phone-book/phone-book.module';
import { AddressBookComponent } from './address-book/address-book.component';
import { FormsModule } from '@angular/forms';
import { ValidatorDirective } from 'src/library/phone-book/directives/validator.directive';
import {ToastModule} from 'primeng/toast';

@NgModule({
  declarations: [
    AppComponent,
    AddressBookComponent,
    ValidatorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PhoneBookModule,
    FormsModule,
    ToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
