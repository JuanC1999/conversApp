import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl = 'https://www.hostcatedral.com/api/app-chat/public';

  constructor(private http: HttpClient) {}

  getGroupsByUser(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/group-members-by-user/${userId}`);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }

  getPrivateMessages(senderId: string, receiverId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/private-messages-by-user/${senderId}/${receiverId}`);
  }

  getGroupMessages(groupId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/group-messages-by-group/${groupId}`);
  }

  sendGroupMessage(senderId: number, groupId: number, content: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/group-messages`, { sender_id: senderId, group_id: groupId, content: content });
  }

  sendPrivateMessage(senderId: number, receiverId: number, content: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/private-messages`, { sender_id: senderId, receiver_id: receiverId, content });
  }
}