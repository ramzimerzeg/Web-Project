import { Injectable } from '@angular/core';
import { Task } from './models/task.model';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private WebRequestService : WebRequestService) { }

  getLocalisations(ressourceId:string){
    return this.WebRequestService.get(`ressources/${ressourceId}/localisation`);
  }

  getdescriptions(ressourceId:string){
    return this.WebRequestService.get(`ressources/${ressourceId}/descriptions`);
  }

  getRessources(){
    return this.WebRequestService.get('ressources');
  }

  createRessource(title:string,localisation:string){
    //send web request to create ressource
    return this.WebRequestService.post('ressources',{title,localisation});
  }

  updateRessource(id:string,title:string,localisation:string){
    //send web request to update ressource
    return this.WebRequestService.patch(`ressources/${id}`,{title,localisation});
  }

  deleteRessource(id:string){
    return this.WebRequestService.delete(`ressources/${id}`);
  }

  getTasks(ressourceId: string) {
    return this.WebRequestService.get(`ressources/${ressourceId}/tasks`);
  }

  createTask(title:string, ressourceId:string){
    //send web request to create task
    return this.WebRequestService.post(`ressources/${ressourceId}/tasks`,{title});
  }

  deleteTask(listId:string, taskId:string){
    return this.WebRequestService.delete(`ressources/${listId}/tasks/${taskId}`);
  }

  updateTask(listId:string, taskId:string,title:string){
    //send web request to update ressource
    return this.WebRequestService.patch(`ressources/${listId}/tasks/${taskId}`,{title});
  }

  complete(task:Task){
    return this.WebRequestService.patch(`ressources/${task._ressourceId}/tasks/${task._id}`,{
      completed:!task.completed
    });
  }

  getAllusers(){
    return this.WebRequestService.get('allusers');
  }
}
