import { Injectable, EventEmitter, Output } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class CommonService {
@Output() aClickedEvent = new EventEmitter<string>();

AClicked(msg: string) {
  this.aClickedEvent.emit(msg);
}
}