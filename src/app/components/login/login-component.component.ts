/**
 *
 * @name login.component
 * @author Anil Patel (Aneilpatel05)
 * @description
 * This component used for log in user
 */
import { Component, OnInit, Inject,NgZone } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SteemconnectAuthService } from '../../steemconnect/services/steemconnect-auth.service';
import { SteemKeychainService } from '@steeveproject/ngx-steem-keychain'
import { Router, ActivatedRoute } from '@angular/router';
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
  public keychainflag: any;  
  ngxService: any;
  constructor(public auth: SteemconnectAuthService, private steemKeychain: SteemKeychainService, @Inject(DOCUMENT) private document: Document,
  private zone: NgZone,private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  onLoginWithSteemconnect() {
    //DO SC2 Login
    this.auth.login();
  }

  onLoginWithKeychain() {
    //DO Keychain Login
    let res;
    // this.steemKeychain.requestHandshake()
    // .subscribe(data => {
    //  this.keychainflag = data;
    //  console.log(res);
    // })
  //   this.steemKeychain.requestHandshake()
  // .subscribe(
  //   (data) => {
  //      //Called when success
  //      this.keychainflag = data;
  //    console.log(data);
  //    },
  //   (error) => {
  //      //Called when error
  //   }
  // ).add(() => {
  //      //Called when operation is complete (both success and error)
  //      console.log("done")
  // });
  this.steemKeychain.requestVerifyKey('anlptl','smmsg','Active')
  .subscribe(
    (data) => {
       //Called when success
       this.keychainflag = data;
     console.log(data);
     },
    (error) => {
       //Called when error
    }
  ).add(() => {
       //Called when operation is complete (both success and error)
       console.log("done")
       this.steemKeychain.requestSignBuffer('anlptl','smmsg','Active')
  .subscribe(
    (data) => {
       //Called when success
       console.log(" sign done" )
       this.zone.run(() => {
        console.log(" in zone" )
         this.router.navigate([`profile`])
       })
     },
    (error) => {
       //Called when error
    }
  ).add(() => {
       //Called when operation is complete (both success and error)
     
  });
  });
  }
  
}
