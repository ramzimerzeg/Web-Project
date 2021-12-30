import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { isEmpty } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.scss']
})
export class UsersManagementComponent implements OnInit {

  constructor(private TaskService:TaskService, private route: ActivatedRoute, private authService : AuthService, private router:Router) { }

  users:any;
  Selecteduser:any;

  ngOnInit(): void {

    if (this.authService.getUserId() == null) {
      this.router.navigate(['/login']);
    }
    
    // this.route.params.subscribe(
    //   (params: Params) => {
    //     if (params['userId']) {
    //       this.Selecteduser = params['userId'];
    //       this.users.forEach((element:any) => {
    //         if (element.id == params['userId']) {
    //           this.Selecteduser = element;
    //         }
    //       });
    //     } 
    //   }
    // )

    this.TaskService.getAllusers().subscribe((users:any)=>{
      this.users=users;
    })

  }

  SelectedUser(user:any){
    this.Selecteduser = user;
  }

  onSaveClick(username:string,password:string){
    if (username.length === 0) {
      alert("Veuillez introduire un nom d'utilisateur !")
    } else{
      if(confirm("Êtes-vous sûr de vouloir modifier cet utilisateur ")) {
        this.authService.updateUser(this.Selecteduser._id,username,password).subscribe(()=>{
          console.log("updated successfully");
          this.Selecteduser.username= username;
          this.Selecteduser.password= "";
        })
      }
    }
  }

  onDeleteUserClick(id:string){
    if(confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ")) {
      this.authService.deletUser(id).subscribe(()=>{
        this.router.navigate(['/users-management']);
      })
    }
    
  }

  onlogoutClick() {
    this.authService.logout();
  }

}
