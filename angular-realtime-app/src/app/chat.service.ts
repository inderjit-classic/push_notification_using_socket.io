import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { observable, Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  observer: Observer<any>;

  constructor(private socket: Socket) { 
  }

  public sendMessage(message) {
    console.log('here we go',message)
    this.socket.emit('new-message', message);
  }
  

  public getMessages() : Observable<any>{

    this.socket.on('my broadcast', (data: string)=> {
        console.log('res',data)
        this.observer.next(data);
    })
    return this.createObservable();
  }
  createObservable(): Observable<any> {
    return new Observable<any>(observer => {
        this.observer = observer;
    });
}
}
