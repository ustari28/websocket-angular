import { Component } from '@angular/core';
import * as SockeJS from 'sockjs-client';
import * as Stom from '@stomp/stompjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  stompClient = null;
  messages: String[] = [];

  connect(): void {
    this.stompClient = Stom.over(new SockeJS('http://127.0.0.1:8080/gs-guide-websocket'));
    this.stompClient.connect({}, function (frame) {
        // setConnected(true);
        console.log('Connected: ' + frame);
        this.stompClient.subscribe('/topic/greetings', function (greeting) {
            this.showGreeting(JSON.parse(greeting.body).content);
        });
    });
  }
  sendName(name: String) {
    this.stompClient.send('/app/hello', {}, JSON.stringify({'name': name}));
  }
  showGreeting(message: String): void {
    this.messages.push(message);
    console.log(message);
  }
  disconnect() {
    if (this.stompClient !== null) {
        this.stompClient.disconnect();
    }
    // this,setConnected(false);
    console.log('Disconnected');
  }
}
