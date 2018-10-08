import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {LayoutComponent} from './layout/layout.component';
import {UserTableComponent} from './user-table/user-table.component';
import {LoginGuard} from './login/LoginGuard';
import {RoleTableComponent} from './role-table/role-table.component';
import {VendingMachineComponent} from './vending-machine/vending-machine.component';


const routes: Routes = [{
  path: '',
  redirectTo: 'login',
  pathMatch: 'full'
}, {
  path: 'home',
  component: LayoutComponent,
  children: [{
    path: 'userTable',
    component: UserTableComponent
  }, {
    path: 'roleTable',
    component: RoleTableComponent
  }, {
    path: 'monitor',
    component: VendingMachineComponent
  }],
  canActivate: [LoginGuard]
}, {
  path: 'login',
  component: LoginComponent
}];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [LoginGuard],
  declarations: []
})
export class AppRoutingModule {
}
