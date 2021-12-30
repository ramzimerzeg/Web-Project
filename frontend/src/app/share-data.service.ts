import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  private Ressource = new BehaviorSubject<any>("");
  currentRessource = this.Ressource.asObservable();

  private Task = new BehaviorSubject<any>("");
  currentTask = this.Task.asObservable();

  constructor() { }

  changeRessource(ressource : any){
    this.Ressource.next(ressource);
  }

  changeTask(task : any){
    this.Task.next(task);
  }


}
