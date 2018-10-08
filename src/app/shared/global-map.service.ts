import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalMapService {

  private map: { [key: string]: any } = {};

  public put(key: string, value: any): void {
    this.map[key] = value;
  }

  public get(key: string): any {
    let value = this.map[key];
    delete this.map[key];
    return value;
  }
}
