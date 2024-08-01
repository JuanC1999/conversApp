import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  user: any;
  groups: any[] = [];
  users: any[] = [];
  selectedGroup: any;
  selectedUser: any;
  messages: any[] = [];
  privateMessages: any[] = [];
  messageContent: string = '';
  privateMessageContent: string = '';
  showUserList: boolean = false;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    const userString = localStorage.getItem('user');
    this.user = userString ? JSON.parse(userString) : null;
    this.chatService.getGroupsByUser(this.user.id).subscribe(groups => {
      this.groups = groups;
    });
    this.chatService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  selectGroup(group: any) {
    this.selectedGroup = group;
    this.selectedUser = null;
    this.chatService.getGroupMessages(group.group_id).subscribe(messages => {
      this.messages = messages.reverse();
    });
  }

  startNewChat() {
    this.showUserList = true;
  }

  selectUser(user: any) {
    this.selectedUser = user;
    this.selectedGroup = null;
    this.showUserList = false;
    this.chatService.getPrivateMessages(this.user.id, user.id).subscribe(messages => {
      this.privateMessages = messages;
      const sender = this.users.find(user => user.id === this.selectedUser.id);
      this.privateMessages.forEach(message => {
        message.sender = sender.username;
      });
    });
  }

  sendMessageGroup() {
    if (this.messageContent.trim()) {
      this.chatService.sendGroupMessage(this.user.id, this.selectedGroup.group_id, this.messageContent).subscribe(response => {
        const newMessage = {
          content: this.messageContent,
          sender: this.user.username,
        };
        this.messages.push(newMessage);
        this.messageContent = '';
      });
    }
  }

  sendPrivateMessage() {
    if (this.privateMessageContent.trim()) {
      this.chatService.sendPrivateMessage(this.user.id, this.selectedUser.id, this.privateMessageContent).subscribe(response => {
        const newMessage = {
          content: this.privateMessageContent,
          sender: this.user.username,
        };
        this.privateMessages.push(newMessage);
        this.privateMessageContent = '';
      });
    }
  }
}