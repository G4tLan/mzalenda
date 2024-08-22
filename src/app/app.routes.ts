import { Routes } from '@angular/router';
import { NominateComponent } from './pages/nominate/nominate.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path: "nominate",
        component: NominateComponent
    },
    {
        path: "calendar",
        component: HomeComponent
    },
    {
        path: "**",
        redirectTo: '/calendar',
        pathMatch: 'full'
    },
];
