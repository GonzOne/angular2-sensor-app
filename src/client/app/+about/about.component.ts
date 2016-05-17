import { OnActivate, RouteSegment, Router } from '@angular/router';
import { Component } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'sd-about',
  templateUrl: 'app/+about/about.component.html',
  styleUrls: ['app/+about/about.component.css'],
  directives: [CORE_DIRECTIVES]
})
/**
 * This class represents the lazy loaded AboutComponent.
 */
export class AboutComponent implements OnActivate {
    public descriptions: Array<string>;

    constructor(private router: Router,
                private af: AngularFire) {

        this.descriptions = ['Product Development', 'Entrepenuer', 'Technologist', 'Cult Leader'];
    };

    public routerOnActivate(curr: RouteSegment, prev: RouteSegment) {
        if (!this.af.auth.getAuth()) {
            this.router.navigate(['/']);
        }
    };
}
