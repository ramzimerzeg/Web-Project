import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { ShareDataService } from 'src/app/share-data.service';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-edit-ressource',
  templateUrl: './edit-ressource.component.html',
  styleUrls: ['./edit-ressource.component.scss']
})
export class EditRessourceComponent implements OnInit {

  constructor(private authservice:AuthService,private TaskService:TaskService, private route: ActivatedRoute, private router:Router, private sharedata:ShareDataService) { }

  Ressource:any;

  RessourceId: string="";

  ngOnInit(): void {

    if (this.authservice.getUserId() == null) {
      this.router.navigate(['/login']);
    }

    this.route.params.subscribe(
      (params: Params) => {        
        if (params['ressourceId']) {
          this.RessourceId = params['ressourceId'];
        }       
      }
    )

    this.sharedata.currentRessource.subscribe(ressource => this.Ressource = ressource);
  }

  UpdateRessource(title:string,localisation:string){
    if (title=="" || localisation == "") {
      alert("veuillez saisir un nom et une localisation");
    } else {
      this.TaskService.updateRessource(this.RessourceId,title,localisation).subscribe(()=>{
        this.router.navigate(['/ressources',this.RessourceId]);
      })
    }
  }

}
