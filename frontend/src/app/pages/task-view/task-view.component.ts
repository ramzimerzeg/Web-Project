import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Task } from 'src/app/models/task.model';
import { ShareDataService } from 'src/app/share-data.service';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  ressources: any;
  tasks: any;
  lien:String="";

  selectedRessourceId: string="";

  constructor(private TaskService:TaskService, private route: ActivatedRoute, private router:Router, private authService : AuthService, private sharedata:ShareDataService) { }
  
  ngOnInit(): void {
    if (this.authService.getUserId() == null) {
      this.router.navigate(['/login']);
    }

    this.route.params.subscribe(
      (params: Params) => {        
        if (params['ressourceId']) {
          this.selectedRessourceId = params['ressourceId'];
          this.TaskService.getTasks(params['ressourceId']).subscribe((tasks:any)=>{
            this.tasks=tasks;
          })
        }else{
          this.tasks = undefined;
        }         
      }
    )

    this.TaskService.getRessources().subscribe((ressources:any)=>{
      this.ressources=ressources;
    })
  }

  OnTaskClick(task:Task){

    //set task to completed
    this.TaskService.complete(task).subscribe(()=>{
      console.log("completed successfuly");
      task.completed=!task.completed;
    });
  }

  onDeleteRessourceClick() {
    if(confirm("Êtes-vous sûr de supprimer cet ressource ")) {
      this.TaskService.deleteRessource(this.selectedRessourceId).subscribe((res: any) => {
        this.router.navigate(['/ressources']);
      })
    }
  }

  onModifierRessourceClick() {
    this.ressources.forEach((element : any) => {
      if (element._id == this.selectedRessourceId){
        this.sharedata.changeRessource(element);
      }
    });
  }

  onModifierTaskClick(task:any) {
    this.sharedata.changeTask(task);
  }
  
  onDeleteTaskClick(taskid:string) {
    this.TaskService.deleteTask(this.selectedRessourceId,taskid).subscribe((res: any) => {
      this.tasks = this.tasks.filter((val:any) =>val._id !== taskid);
    })
  }

  onlogoutClick() {
    this.authService.logout();
  }

  // createNewList(){
  //   this.TaskService.createList('Testing').subscribe((response: any)=>{
  //     console.log(response);
  //   });
  // }

}
