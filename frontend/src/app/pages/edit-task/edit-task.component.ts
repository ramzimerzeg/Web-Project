import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { ShareDataService } from 'src/app/share-data.service';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  constructor(private authservice:AuthService,private TaskService:TaskService, private route: ActivatedRoute, private router:Router, private sharedata:ShareDataService) { }

  TaskId: string="";
  RessourceId: string="";
  localisations:any;

  Task:any;

  ngOnInit(): void {

    if (this.authservice.getUserId() == null) {
      this.router.navigate(['/login']);
    }

    this.route.params.subscribe(
      (params: Params) => {        
        if (params['taskId']) {
          this.TaskId = params['taskId'];
          this.RessourceId = params['ressourceId'];
        }       
      }
    )

    this.sharedata.currentTask.subscribe(task => this.Task = task);

    this.TaskService.getLocalisations(this.RessourceId).subscribe((localisations:any)=>{
      this.localisations=localisations.localisation;
    });
  }

  updateTask(title:string){
    if (title=="") {
      alert("veuillez saisir un nom et une localisation");
    } else {
      this.TaskService.updateTask(this.RessourceId,this.TaskId,title).subscribe(()=>{
        this.router.navigate(['/ressources',this.RessourceId]);
      })
    }
  }

}
