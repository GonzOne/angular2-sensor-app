import { OnActivate, RouteSegment, Router } from '@angular/router';
import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { AngularFire } from 'angularfire2';
import { PaletteService } from '../shared/index';
import * as moment from 'moment';

@Component({
    selector: 'sd-about',
    viewProviders: [PaletteService],
    templateUrl: 'app/+sensor/sensor.component.html',
    styleUrls: ['app/+sensor/sensor.component.css'],
    directives: [NgStyle],
    providers: [PaletteService]
})
/**
 * This class represents the lazy loaded AboutComponent.
 */
export class SensorComponent implements OnActivate {
    public swatch: string;
    public today: string;
    public lumens: string;
    private queryObservable: any;
    constructor(private router: Router,
                private af: AngularFire,
                private colorPalette: PaletteService) {
        this.swatch = '#FFFFFF';
        this.today = moment().format('dddd MMM D YYYY');
    }

    public routerOnActivate(curr: RouteSegment, prev: RouteSegment) {
        if (!this.af.auth.getAuth()) {
            this.router.navigate(['/']);
        }
        this.getSensorData();
    };

    private getSensorData () {
        this.queryObservable = this.af.database.list('/linino/sensors/light_sensor', {
            query: {
                limitToLast: 1,
            }
        });
        if ( this.queryObservable !== undefined) {
            this.queryObservable.subscribe((queriedItems: any) => {
                    if ( queriedItems[0] !== undefined) {
                        this.setLumens(queriedItems[0]);
                    }

                },
                (error: any) => this.logError(error));
        }
    }
    private setLumens(obj:any): void {
        if (obj.$value) {
            let colors =  this.colorPalette.pallete;
            this.swatch = colors[obj.$value];
            this.lumens = String(obj.$value);
        }

    }
    private logError(err: any) {
        console.log('logError', err);
    }
}
