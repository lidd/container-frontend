import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LayoutComponent} from './layout/layout.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {LoginComponent} from './login/login.component';
import {AppRoutingModule} from './app-routing.module';
import {UserTableComponent} from './user-table/user-table.component';
import {AuthTreeComponent} from './auth-tree/auth-tree.component';
import {RoleTableComponent} from './role-table/role-table.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AddUserFormComponent} from './add-user-form/add-user-form.component';
import {AddRoleFormComponent} from './add-role-form/add-role-form.component';
import { VendingMachineComponent } from './vending-machine/vending-machine.component';
import { GoodsTableComponent } from './goods-table/goods-table.component';
import { AddMachineFormComponent } from './add-machine-form/add-machine-form.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    UserTableComponent,
    AuthTreeComponent,
    RoleTableComponent,
    AddUserFormComponent,
    AddRoleFormComponent,
    VendingMachineComponent,
    GoodsTableComponent,
    AddMachineFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    AppRoutingModule
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent],
  entryComponents: [AuthTreeComponent, AddUserFormComponent, AddRoleFormComponent]
})
export class AppModule {
}
