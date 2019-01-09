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
import {VendingMachineTableComponent} from './vending-machine-table/vending-machine-table.component';
import {GoodsTableComponent} from './goods-table/goods-table.component';
import {AddMachineFormComponent} from './add-machine-form/add-machine-form.component';
import { MerchantTableComponent } from './merchant-table/merchant-table.component';
import { AddMerchantFormComponent } from './add-merchant-form/add-merchant-form.component';
import { GoodsDescTableComponent } from './goods-desc-table/goods-desc-table.component';
import { AddGoodsDescFormComponent } from './add-goods-desc-form/add-goods-desc-form.component';
import { GoodsOrderTableComponent } from './goods-order-table/goods-order-table.component';
import { AddGoodsFormComponent } from './add-goods-form/add-goods-form.component';
import {Base64} from './shared/base64.pipe';
import { DeliverySheetTableComponent } from './delivery-sheet-table/delivery-sheet-table.component';
import { GoodsCollectTableComponent } from './goods-collect-table/goods-collect-table.component';


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
    VendingMachineTableComponent,
    GoodsTableComponent,
    AddMachineFormComponent,
    MerchantTableComponent,
    AddMerchantFormComponent,
    GoodsDescTableComponent,
    AddGoodsDescFormComponent,
    GoodsOrderTableComponent,
    AddGoodsFormComponent,
    Base64,
    DeliverySheetTableComponent,
    GoodsCollectTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    AppRoutingModule,
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent],
  entryComponents: [
    AuthTreeComponent,
    AddUserFormComponent,
    AddRoleFormComponent,
    AddMachineFormComponent,
    AddMerchantFormComponent,
    AddGoodsDescFormComponent,
    AddGoodsFormComponent
  ]
})
export class AppModule {
}
