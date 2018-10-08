import {Component, OnInit} from '@angular/core';
import {RoleService} from '../shared/role.service';
import {Role} from '../model/Role';
import {Resource} from '../model/Resource';
import {UserService} from '../shared/user.service';
import {ModalOptionsForService, NzModalService, NzNotificationService, NzTreeNode} from 'ng-zorro-antd';
import {ResourceService} from '../shared/resource.service';
import {AuthTreeComponent} from '../auth-tree/auth-tree.component';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {GlobalMapService} from '../shared/global-map.service';
import {Cmd} from '../model/Cmd';
import {RefreshEmitterService} from '../shared/refresh-emitter.service';
import {AddRoleFormComponent} from '../add-role-form/add-role-form.component';

@Component({
  selector: 'app-role-table',
  templateUrl: './role-table.component.html',
  styleUrls: ['./role-table.component.css']
})
export class RoleTableComponent implements OnInit {


  roleList = [];
  resourceList = [];
  checkedResources = [];
  selectedRoleId: number;

  constructor(private nzModalService: NzModalService, private roleService: RoleService,
              private userService: UserService, private resourceService: ResourceService,
              private globalMap: GlobalMapService, private notifyService: NzNotificationService,
              private refreshEmitter: RefreshEmitterService) {
  }

  ngOnInit() {
    this.initRoleList();
  }

  createModal(id: number): void {
    this.resourceList = [];
    this.checkedResources = [];
    this.selectedRoleId = id;
    this.initResourceTree().subscribe(() => {
      this.initCheckedResources(id).subscribe(() => {
        let option: ModalOptionsForService = {
          nzVisible: true,
          nzTitle: '授权',
          nzOkLoading: false,
          nzContent: AuthTreeComponent,
          nzComponentParams: {
            allNodes: this.resourceList,
            defaultCheckedNodes: this.checkedResources,
          }
        };
        option.nzOnCancel = function () {
          option.nzVisible = false;
        };
        option.nzOnOk = () => this.submit();
        this.nzModalService.create(option);
      });
    });

  }


  initRoleList(): void {
    this.roleService.allRoles().subscribe(res => {
      if (res.code == 1000) {
        this.roleList = <Array<Role>>res.data;
      }
    });
  }

  initResourceTree(): Observable<void> {
    return this.resourceService.allResources().pipe(
      map(res => {
        if (res.code == 1000) {
          let resources: Array<Resource> = <Array<Resource>>res.data;
          for (const resource of resources) {
            let node = {title: resource.name, key: resource.id, children: [], selectable: false};
            if (resource.children) {
              resource.children.forEach(c => node.children.push({title: c.name, key: c.id, selectable: false}));
            }
            this.resourceList.push(node);
          }
        }
      })
    );
  }

  initCheckedResources(roleId: number): Observable<void> {
    return this.roleService.getResourcesByRoleId(roleId).pipe(
      map(res => {
        if (res.code = 1000) {
          let resources: Array<Resource> = (<Role>res.data).resources;
          console.log(resources);
          resources.forEach(res => {
            if (res.children) {
              res.children.forEach(c => {
                this.checkedResources.push(c.id);
              });
            } else {
              this.checkedResources.push(res.id);
            }
          });
        }
      })
    );
  }

  private submit() {
    let checkedNodes: Array<NzTreeNode> = this.globalMap.get('checkedKeys');
    if (checkedNodes) {
      let nodes = [];
      console.log(checkedNodes);
      checkedNodes.forEach(n => {
        if (n.isAllChecked) {
          n.children.forEach(c => nodes.push(parseInt(c.key)));
        }
        nodes.push(parseInt(n.key));
      });
      this.roleService.save(this.selectedRoleId, nodes).subscribe(res => {
        if (res.code == 1000) {
          this.notifyService.success('成功', '修改成功，重新登录后生效！');
          this.initCheckedResources(this.selectedRoleId);
        }
      });
    }
  }


  addRoleModal() {
    let option: ModalOptionsForService = {
      nzVisible: true,
      nzTitle: '新增角色',
      nzContent: AddRoleFormComponent,
      nzFooter: null
    };
    let modalRef = this.nzModalService.create(option);
    this.refreshEmitter.subscribe(e => {
      if (e.name == Cmd.close_role_add_form) {
        modalRef.destroy();
      }
      if (e.name == Cmd.refresh_role_table) {
        this.initRoleList();
      }
    });
  }
}
