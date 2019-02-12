/**
 *
 * @name login.component
 * @author Anil Patel (Aneilpatel05)
 * @description
 * This component used for log in user
 */
import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SteemconnectAuthService } from '../../steemconnect/services/steemconnect-auth.service';
import { SteemKeychainService } from '@steeveproject/ngx-steem-keychain'
import {environment} from '../../../environments/environment';
import { AuthGuard } from 'src/guards/auth-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponent implements OnInit {
  public userData: {username: string;} = {
    username: ''
  };
  
  constructor(public auth: SteemconnectAuthService, private steemKeychain: SteemKeychainService, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
  }

  onLoginWithSteemconnect() {
    //DO SC2 Login
    this.auth.login();
  }

  onLoginWithKeychain() {
    //DO Keychain Login
    console.log("callled");
    this.steemKeychain.requestHandshake();
  }

}
