import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from './guards/AuthenticatedGuard.guard';

const routes: Routes = [
  { path: "auth", loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule) },
  { path: "dashboard", loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardModule), canActivate: [AuthenticatedGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthenticatedGuard]
})
export class AppRoutingModule { }
