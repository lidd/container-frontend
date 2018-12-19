import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/user.service';
import {AuthTreeComponent} from '../auth-tree/auth-tree.component';
import {ModalOptionsForService, NzModalService, NzNotificationService, NzTreeNode} from 'ng-zorro-antd';
import {RoleService} from '../shared/role.service';
import {Role} from '../model/Role';
import {User} from '../model/User';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {GlobalMapService} from '../shared/global-map.service';
import {AddUserFormComponent} from '../add-user-form/add-user-form.component';
import {RefreshEmitterService} from '../shared/refresh-emitter.service';
import {Cmd} from '../model/Cmd';
import {Merchant} from '../model/Merchant';
import {MerchantService} from '../shared/merchant.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

  constructor(private userService: UserService, private roleService: RoleService,
              private nzModalService: NzModalService, private nzNotificationService: NzNotificationService,
              private globalMap: GlobalMapService, private refreshEmitter: RefreshEmitterService,
              private merchantService: MerchantService) {
  }

  userList = [];

  checkedRoles = [];

  merchants: Array<Merchant>;

  authUserId: number = -1;

  showAuthModal(userId: number): void {
    this.authUserId = userId;
    let nodes = [];
    this.checkedRoles = [];

    this.initRoleList(nodes).subscribe(r => {
      if (r) {
        this.initCheckedRoles(userId);
        let option: ModalOptionsForService = {
          nzVisible: true,
          nzTitle: '授权',
          nzOkLoading: false,
          nzContent: AuthTreeComponent,
          nzComponentParams: {
            allNodes: nodes,
            defaultCheckedNodes: this.checkedRoles,
          }
        };
        option.nzOnCancel = function () {
          option.nzVisible = false;
        };
        option.nzOnOk = () => this.submitAuth();
        this.nzModalService.create(option);
      }
    });
  }

  editCache = {};

  private submitAuth(): void {
    if (this.authUserId != -1) {
      let checkedNodes: Array<NzTreeNode> = this.globalMap.get('checkedKeys');
      if (checkedNodes) {
        let nodes = [];
        checkedNodes.forEach(n => nodes.push(parseInt(n.key)));
        this.userService.authUser(this.authUserId, nodes).subscribe(res => {
          if (res.code == 1000) {
            if (this.authUserId == this.userService.currentUser.id) {
              this.userService.queryUser(this.authUserId).subscribe(res => {
                if (res.code == 1000) {
                  this.userService.setCurrentUser(<User>res.data);
                }
              });
            }
            this.loadUserList();
          }
        });
      }
    }
  }

  startEdit(id: number): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: number): void {
    this.editCache[id].edit = false;
  }

  saveEdit(id: number): void {
    const index = this.userList.findIndex(item => item.id === id);
    Object.assign(this.userList[index], this.editCache[id].user);
    let param = this.userList[index];
    param.merchant = {id: param.merchantId};
    this.userService.saveUser(param).subscribe(res => {
      if (res.code == 1000) {
        this.nzNotificationService.success('成功', '修改成功');
        this.loadUserList();
      }
    });
    // this.userList[ index ] = this.editCache[ id ].data;
    this.editCache[id].edit = false;
  }

  updateEditCache(): void {
    this.userList.forEach(item => {
      if (!this.editCache[item.id]) {
        this.editCache[item.id] = {
          edit: false,
          user: {...item}
        };
      }
    });
  }

  ngOnInit(): void {
    this.loadUserList();
    this.merchantService.getMerchantList().subscribe(res => {
      if (res.code == 1000) {
        this.merchants = <Array<Merchant>>res.data;
      }
    });
  }

  loadUserList(): void {
    this.userService.getUserList().subscribe(res => {
      if (res.code == 1000) {
        this.userList = <Array<User>>res.data;
      }
      this.updateEditCache();
    });
  }

  showUserDetail(id: number) {
    this.userService.queryUser(id).subscribe(res => {
      if (res.code == 1000) {
        this.queriedUser = <User>res.data;
        this.openDrawer();
      }
    });
  }

  private initRoleList(nodes: Array<any>): Observable<boolean> {
    return this.roleService.allRoles().pipe(
      map(res => {
        if (res.code == 1000) {
          for (const role of <Array<Role>>res.data) {
            nodes.push({key: role.id, title: role.name, selectable: false});
          }
          return true;
        } else {
          this.nzNotificationService.error('错误', `${res.code}: ${res.msg}`);
          return false;
        }
      })
    );
  }

  private initCheckedRoles(userId: number): void {
    this.userService.queryUser(userId).subscribe(res => {
      if (res.code == 1000) {
        let user = <User>res.data;
        if (user) {
          user.roles.forEach(r => {
            this.checkedRoles.push(r.id);
          });
        }
      }
    });
  }

  queriedUser: User = {id: 0, name: undefined, roles: undefined, phone: undefined};

  drawerVisible = false;

  openDrawer(): void {
    this.drawerVisible = true;
  }

  closeDrawer(): void {
    this.drawerVisible = false;
  }

  addUserModal() {
    let option: ModalOptionsForService = {
      nzVisible: true,
      nzTitle: '新增用户',
      nzContent: AddUserFormComponent,
      nzFooter: null
    };
    let modalRef = this.nzModalService.create(option);
    this.refreshEmitter.subscribe(e => {
      if (e.name == Cmd.close_user_add_form) {
        modalRef.destroy();
      }
      if (e.name == Cmd.refresh_user_table) {
        this.loadUserList();
      }
    });
  }
}
