import { Routes } from '@angular/router';
import { TrackingListComponent } from './tracking-list/tracking-list.component';


export const TrackingRoutes: Routes = [
    { path: '', component: TrackingListComponent, data: { breadcrumbs: true, text: 'Tracking' } }
];
