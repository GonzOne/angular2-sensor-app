import { FormBuilder, Validators, ControlGroup, FORM_DIRECTIVES, CORE_DIRECTIVES } from '@angular/common';
import { Component } from '@angular/core';
import{ Router } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { GlobalVarService} from '../shared/index';
import { AlertComponent } from 'ng2-bootstrap/components/alert';

@Component({
  selector: 'sd-home',
  templateUrl: 'app/+home/home.component.html',
  styleUrls: ['app/+home/home.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, AlertComponent]
})
/**
 * This class represents the lazy loaded HomeComponent.
 */
export class HomeComponent {

  public loginForm:ControlGroup;
  public auth:AngularFire;
  public alerts:Array<Object> = [];
  /**
   * Creates an instance of the HomeComponent with the injected
   * Router
   * FormBuilder
   * AngularFire
   * GlobalVarService
   * @param {Router, FormBuilder, AngularFire, GlobalVarService}
   */
  constructor(private router:Router,
              private fb:FormBuilder,
              private af:AngularFire,
              private globalService:GlobalVarService) {
      this.auth = af;
      this.createLoginForm();
  }

    public closeAlert(i:number):void {
        this.alerts.splice(i, 1);
        this.createLoginForm();
    };

    public onSubmit(event:any):void {
        const promise = this.auth.auth.login(this.loginForm.value);
        promise
            .then(_ => {
                this.globalService.logIn = true;
                this.router.navigate(['/sensor']);
            })
            .catch(error => this.handleError(error));
        event.preventDefault();
    };

    private createLoginForm() :void {
        this.loginForm = this.fb.group({
            email: ['', Validators.required],//@todo - add expression validator
            password: ['', Validators.required]
        });
    };

    private handleError(error:any): void {
        this.alerts.push({msg: error, type: 'danger', dismissible: true, dismissOnTimeout: 3000});
    };

}
