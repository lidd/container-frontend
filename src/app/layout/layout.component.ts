import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Resource} from '../model/Resource';
import {User} from '../model/User';
import {UserService} from '../shared/user.service';
import {GlobalMapService} from '../shared/global-map.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  triggerTemplate = null;
  @ViewChild('trigger') customTrigger: TemplateRef<void>;

  /** custom trigger can be TemplateRef **/
  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }

  menusWithChildren: Array<Resource> = [];

  menusWithoutChildren: Array<Resource> = [];


  breadcrumbs: Array<string> = ['首页'];

  currentUser: User;

  constructor(private userService: UserService, private globalEvent: GlobalMapService) {
  }

  ngOnInit(): void {
    this.loadMenus();
  }

  loadMenus(): void {
    this.currentUser = this.userService.getCurrentUser();
    if (this.currentUser) {
      for (let role of this.currentUser.roles) {
        for (let resource of role.resources) {
          if (!this.checkMenuExist(resource)) {
            if (resource.children && resource.children.length > 0)
              this.menusWithChildren.push(resource);
            else
              this.menusWithoutChildren.push(resource);
          }
        }
      }
    }
  }

  private checkMenuExist(resource: Resource): boolean {
    for (let menu of this.menusWithChildren) {
      if (menu.id == resource.id) {
        for (let child of menu.children) {
          for (let rChild of resource.children) {
            if (child.id != rChild.id) {
              menu.children.push(rChild);
            }
          }
        }
        return true;
      }
    }
    return false;
  }

  updateBreadcrumb(id: number) {
    this.breadcrumbs = ['首页'];
    for (let menu of this.menusWithChildren) {
      if (menu.children) {
        for (const child of menu.children) {
          if (id == child.id) {
            this.breadcrumbs.push(menu.name, child.name);
            return;
          }
        }
      }
    }
  }

  logout() {
    this.userService.logout();
  }
}
