import {User} from './User';

export class VendingMachine {
  serial: string;

  location: string;

  status: number;

  updateTime: number;

  master: User;

  getStatus(): string {
    switch (this.status) {
      case 1000:
        return '在线';
      case 9999:
        return '离线';
      default:
        return '未知';
    }
  }
}
