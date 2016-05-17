import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { CollapseDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { AngularFire } from 'angularfire2';
import { GlobalVarService } from '../globals/index';

@Component({
  selector: 'sd-navbar',
  templateUrl: 'app/shared/navbar/navbar.component.html',
  styleUrls: ['app/shared/navbar/navbar.component.css'],
  directives: [ROUTER_DIRECTIVES, CollapseDirective]
})
/**
 * This class represents the navigation bar component.
 */
export class NavbarComponent {
    public isLoggedIn: boolean;
    public isCollapsed:boolean = false;

    constructor (private globalService: GlobalVarService,
                 private router: Router,
                 public af: AngularFire) {
        this.router.changes.subscribe (() => {
            this.isLoggedIn = this.globalService.logIn;
        });
    }

    logout(event:any): void {
        this.globalService.logIn = false;
        this.af.auth.logout();
        this.router.navigate(['/']);
        event.preventDefault();
    }
}
