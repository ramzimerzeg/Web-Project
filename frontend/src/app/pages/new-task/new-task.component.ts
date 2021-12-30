import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  constructor(private authservice:AuthService,private TaskService:TaskService, private router:Router, private route:ActivatedRoute) { }

  ressourceId: string="";
  ressource :any;
  descriptions:any;
  connected:any;

  selectedOldTask:any

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
          this.ressourceId=params['ressourceId'];
      }
    )

    this.TaskService.getLocalisations(this.ressourceId).subscribe((res:any)=>{
      this.ressource=res;
    });

    this.TaskService.getdescriptions(this.ressourceId).subscribe((res:any)=>{
      this.descriptions=res;
    });

    this.connected=this.authservice.getUserId();
  }


  createTask(title:string){
    if (title=="") {
      alert("veuillez saisir une description");
    } else {
      this.TaskService.createTask(title,this.ressourceId).subscribe((response: any)=>{
        alert("Un responsable va etre notifié... merci ");
        // navigate to /list/response._id
        //this.router.navigate(['../'],{relativeTo:this.route});
      });
    }
  }
}
