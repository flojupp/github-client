import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterComponent } from './components/master/master.component';
import { DetailComponent } from './components/detail/detail.component';


const routes: Routes = [
  {
    path: "**",
    pathMatch: "full",
    redirectTo: "master"
  },
  {
    path: "master",
    component: MasterComponent
  },
  {
    path: "detail",
    component: DetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
