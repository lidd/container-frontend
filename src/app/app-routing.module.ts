import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {LayoutComponent} from './layout/layout.component';
import {UserTableComponent} from './user-table/user-table.component';
import {LoginGuard} from './login/LoginGuard';
import {RoleTableComponent} from './role-table/role-table.component';
import {VendingMachineTableComponent} from './vending-machine-table/vending-machine-table.component';
import {MerchantTableComponent} from './merchant-table/merchant-table.component';
import {GoodsDescTableComponent} from './goods-desc-table/goods-desc-table.component';
import {GoodsTableComponent} from './goods-table/goods-table.component';


const routes: Routes = [{
  path: '',
  redirectTo: 'login',
  pathMatch: 'full'
}, {
  path: 'home',
  component: LayoutComponent,
  children: [{
    path: 'user',
    component: UserTableComponent
  }, {
    path: 'role',
    component: RoleTableComponent
  }, {
    path: 'monitor',
    component: VendingMachineTableComponent
  }, {
    path:'merchant',
    component: MerchantTableComponent
  },{
    path:'goods-desc',
    component:GoodsDescTableComponent
  },{
    path:'goods',
    component:GoodsTableComponent
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
