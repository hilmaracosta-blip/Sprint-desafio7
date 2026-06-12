import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { Home } from './components/home/home';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  // Se estiver vazio, vai direto para a Home ou Dashboard para testarmos no SENAI!
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent },
  { path: 'home', component: Home },
  { path: 'dashboard', component: DashboardComponent }
  // REMOVA temporariamente a linha do '{ path: "**" }' para ela não te sabotar!
];