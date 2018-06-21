import { Routes } from '@angular/router';
import { TrackingComponent } from './tracking.component';


export const TrackingRoutes: Routes = [
    { path: '', component: TrackingComponent, data: { breadcrumbs: true, text: 'Tracking' } }
];
