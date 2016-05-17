import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Email } from './interface/email.interface';

@Injectable()// barell is not working
export class ContactService {

    private contactUrl = './assets/scripts/love_me.php';

    constructor (private http: Http) {}

    sendEmail (newMessage: Email): Observable<string> {

        let body = 'name='+ newMessage.name +'&email=' + newMessage.email + '&message=' + newMessage.message;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.contactUrl, body, options)
            .map(response => response.json())
            .catch(this.handleError);
    }
    private handleError (error: any) {
        let errMsg = error.message || 'error';
        return Observable.throw(errMsg);
    }
}
