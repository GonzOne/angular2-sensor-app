import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Routes, Router} from '@angular/router';

import { AboutComponent } from './+about/index';
import { ContactComponent } from './+contact/index';
import { HomeComponent } from './+home/index';
import { NavbarComponent} from './shared/index';
import { SensorComponent} from './+sensor/index';

@Component({
  selector: 'sd-app',
  templateUrl: 'app/app.component.html',
  directives: [ROUTER_DIRECTIVES, NavbarComponent]
})
@Routes([
  {
    path: '/',
    component: HomeComponent
  },
  { path: '/sensor',
    component: SensorComponent
  },
  {
    path: '/about',
    component: AboutComponent
  },
  { path: '/contact',
    component: ContactComponent
  }
])
/**
 * This class represents the main application component.
 * Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy
 * loaded components (HomeComponent, AboutComponent).
 */
export class AppComponent implements OnInit {
    constructor(private router: Router) {}
    ngOnInit() {
        this.router.navigate(['/']);
    }

}
