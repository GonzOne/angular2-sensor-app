import { OnActivate, RouteSegment, Router } from '@angular/router';
import { Component } from '@angular/core';
import { FORM_PROVIDERS, CORE_DIRECTIVES, FormBuilder, Validators, ControlGroup } from '@angular/common';
import { AngularFire } from 'angularfire2';
import { HTTP_PROVIDERS } from '@angular/http';
import { ValidationService } from '../shared/index';
import { ContactService } from '../shared/contact/contact.service';
import { Email } from '../shared/index';
import { AlertComponent } from 'ng2-bootstrap/components/alert';

@Component({
    selector: 'sd-about',
    templateUrl: 'app/+contact/contact.component.html',
    styleUrls: ['app/+contact/contact.component.css'],
    directives: [AlertComponent, CORE_DIRECTIVES],
    providers: [FORM_PROVIDERS, HTTP_PROVIDERS, ContactService ]
})
/**
 * This class represents the lazy loaded AboutComponent.
 */
export class ContactComponent implements OnActivate {
    public contactForm: ControlGroup;
    public userMessage: Email = {name: '', email: '', subject: '', message: ''};
    public alerts:Array<Object> = [];
    public formSubmitted: boolean = false;
    public formError: boolean = false;

    constructor(private router: Router,
                private fb: FormBuilder,
                private af: AngularFire,
                private cs : ContactService) {
        this.createForm();
    };

    public sendEmail(event:any): void {
        let formData = this.contactForm.value;

        this.userMessage.name = formData.name;
        this.userMessage.email = formData.email;
        this.userMessage.subject = formData.subject;
        this.userMessage.message = formData.message;
        this.formSubmitted = true;

        this.cs.sendEmail(this.userMessage).subscribe(
            (response: any) => this.handleEmailResponse('success'),
            (error: any) => this.handleEmailResponse(error));
    }

    public routerOnActivate (curr: RouteSegment, prev: RouteSegment) {
        if (!this.af.auth.getAuth()) {
            this.router.navigate(['/']);
        }
    };
    public tryAgain (event:any):void {
        this.formError = false;
        this.createForm();
        this.formSubmitted = false;
    };
    public closeAlert(i:number):void {
        this.alerts.splice(i, 1);
    };

    private createForm (): void {

        this.contactForm = this.fb.group ({
            name: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            email: ['',Validators.compose([Validators.required, ValidationService.emailValidator])],
            subject: [''],
            message: ['', Validators.compose([Validators.required, Validators.minLength(4)])]
        });

    };

    private handleEmailResponse(response: any): void {
        console.log('handleEmailResponse ', response);
        switch(response) {
            case 'success':
                let msg = 'Thank you. Your message has been sent!';
                this.alerts.push({msg: msg, type: 'success', dismissible: true, dismissOnTimeout:3000});
                this.createForm();
                this.formSubmitted = false;
                break;
            case 'error':
                this.formError = true;
                let errMsg = 'Uh oh, something went wrong, give it another try.';
                this.alerts.push({msg: errMsg, type: 'danger', dismissible: true, dismissOnTimeout:3000});
                break;
        }
    };
}
