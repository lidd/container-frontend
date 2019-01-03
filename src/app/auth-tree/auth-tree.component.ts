import {Component, OnInit, ViewChild} from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd';
import {GlobalMapService} from '../shared/global-map.service';

@Component({
  selector: 'app-auth-tree',
  templateUrl: './auth-tree.component.html',
  styleUrls: ['./auth-tree.component.css']
})
export class AuthTreeComponent implements OnInit {

  constructor(private notificationService: NzNotificationService, private globalMap: GlobalMapService) {
  }

  @ViewChild('authTree') authTree;

  defaultCheckedNodes = [];
  allNodes = [];

  ngOnInit(): void {
  }

  private initAllResources() {

  }

  createBasicNotification(title: string, content: string): void {
    this.notificationService.config({
      nzPlacement: 'topRight'
    });
    this.notificationService.error(title, content);
  }

  checkedKeysChanged() {
    let nodes = this.authTree.getCheckedNodeList();
    if (this.authTree.getHalfCheckedNodeList()) {
      this.authTree.getHalfCheckedNodeList().forEach(n => nodes.push(n));
    }
    this.globalMap.put('checkedKeys', nodes);
  }
}
