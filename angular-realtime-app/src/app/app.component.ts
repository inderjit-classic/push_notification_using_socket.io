import { Component } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-realtime-app';
  newMessage: string;
  messageList:  string[] = [];

  constructor(private chatService: ChatService){

  }

  sendMessage() {
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }
  ngOnInit() {
    this.chatService
      .getMessages()
      .subscribe((message: string) => {
        console.log('mes',message);
        this.messageList.push(message);
        console.log(this.messageList,'check for list')
      });
  }
}
