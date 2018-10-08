import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RefreshEmitterService {

  private emitter: EventEmitter<any>;

  constructor() {
    this.emitter = new EventEmitter();
  }

  emit(event: any) {
    this.emitter.emit(event);
  }

  subscribe(evt: any) {
    this.emitter.subscribe(evt);
  }
}
