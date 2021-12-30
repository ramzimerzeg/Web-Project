import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { ShareDataService } from 'src/app/share-data.service';
import { WebRequestService } from 'src/app/web-request.service';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})
export class QrcodeComponent implements OnInit {

  constructor(private authservice:AuthService,private router:Router,private route: ActivatedRoute, private webreqservice: WebRequestService) { }
  QRLINK: string ="";
  selectedRessourceId:string="";

  ngOnInit(): void {

    if (this.authservice.getUserId() == null) {
      this.router.navigate(['/login']);
    }
    this.route.params.subscribe(
      (params: Params) => {        
        if (params['ressourceId']) {
          this.selectedRessourceId = params['ressourceId'];
        }         
      }
    )

    this.QRLINK= this.webreqservice.ROOT_URL + "/ressources/"+ this.selectedRessourceId +"/new-task";
  }

}
