import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditRessourceComponent } from './pages/edit-ressource/edit-ressource.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NewRessourceComponent } from './pages/new-ressource/new-ressource.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { NewUserComponent } from './pages/new-user/new-user.component';
import { QrcodeComponent } from './pages/qrcode/qrcode.component';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { UsersManagementComponent } from './pages/users-management/users-management.component';

const routes: Routes = [
  { path : '', redirectTo: 'login',pathMatch:'full'},
  { path : 'new-ressource', component: NewRessourceComponent},
  { path : 'edit-ressource/:ressourceId', component: EditRessourceComponent},
  { path : 'login', component: LoginPageComponent},
  { path : 'users-management', component: UsersManagementComponent},
  { path : 'users-management/:userId', component: UsersManagementComponent},
  { path : 'createUser', component: NewUserComponent},
  { path : 'ressources', component: TaskViewComponent},
  { path : 'ressources/:ressourceId', component: TaskViewComponent},
  { path : 'ressources/:ressourceId/new-task', component: NewTaskComponent},
  { path : 'ressources/:ressourceId/edit-task/:taskId', component: EditTaskComponent},
  { path : 'ressources/:ressourceId/qr-code', component: QrcodeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
