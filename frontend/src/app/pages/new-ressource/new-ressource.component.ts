import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Ressource } from 'src/app/models/ressource.model';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-ressource',
  templateUrl: './new-ressource.component.html',
  styleUrls: ['./new-ressource.component.scss']
})
export class NewRessourceComponent implements OnInit {

  constructor(private authservice:AuthService,private TaskService:TaskService, private router:Router) { }

  ngOnInit(): void {
    if (this.authservice.getUserId() == null) {
      this.router.navigate(['/login']);
    }
  }

  createRessource(title:string,localisation:string){
    if (title=="" || localisation == "") {
      alert("veuillez saisir un nom et une localisation");
    } else {
      this.TaskService.createRessource(title,localisation).subscribe((response: any)=>{
        // navigate to /list/response._id
        this.router.navigate(['/ressources',response._id]);
      });
    }
  }
}
