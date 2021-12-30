import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  constructor(private authservice: AuthService,private router: Router) { }

  ngOnInit(): void {
    if (this.authservice.getUserId() == null) {
      this.router.navigate(['/login']);
    }
  }

  createUser(username:string, password:string){
    if (username == "" || password == "") {
      alert("veuillez saisir un nom d'utilisateur et un mot de passe");
    }else if (password.length < 5) {
      alert("le mot de passe doit contenir au moint 5 caractere");
    } else {
      this.authservice.createuser(username,password).subscribe((res:HttpResponse<any>)=>{
        this.router.navigate(['/users-management']);
      });
    }
  }

}
