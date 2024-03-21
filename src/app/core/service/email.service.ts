import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private url = 'http://localhost:8080/email/';
  constructor(private http: HttpClient) {

  }
  sendMail(data: EmailDetails) {
    return this.http.post(this.url + 'send-mail', data);
  }


}

export interface EmailDetails {
  recipient: string;
  subject: string;
  msgBody: string;
  attachment: any;
}
