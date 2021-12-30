import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onLoginBtnClick(username:string, password:string){
    this.authservice.login(username,password).subscribe((res:HttpResponse<any>)=>{
      if (res.status === 200 ) {
        //we have logged in successfully 
        if (res.body.isadmin) {
          this.router.navigate(['/users-management']);
        } else {
          this.router.navigate(['/ressources']);
        }
      }
    });
  }
}
