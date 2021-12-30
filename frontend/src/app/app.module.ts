import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskViewComponent } from './pages/task-view/task-view.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NewRessourceComponent } from './pages/new-ressource/new-ressource.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { WebReqInterceptor } from './web-req.interceptor.service';
import { UsersManagementComponent } from './pages/users-management/users-management.component';
import { NewUserComponent } from './pages/new-user/new-user.component';
import { EditRessourceComponent } from './pages/edit-ressource/edit-ressource.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { QrCodeModule } from 'ng-qrcode';
import { QrcodeComponent } from './pages/qrcode/qrcode.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    TaskViewComponent,
    NewRessourceComponent,
    NewTaskComponent,
    LoginPageComponent,
    UsersManagementComponent,
    NewUserComponent,
    EditRessourceComponent,
    EditTaskComponent,
    QrcodeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    QrCodeModule,
    FormsModule
  ],
  providers: [
    { provide : HTTP_INTERCEPTORS, useClass: WebReqInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
