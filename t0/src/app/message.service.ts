import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];
  type: string;

  add(message: string){
    this.clear();
    this.messages.push(message);
  }

  setType(type: string){
    this.type = type;
  }

  clear(){
    this.messages = [];
  }
}
