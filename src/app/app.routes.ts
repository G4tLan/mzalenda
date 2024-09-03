import { Routes } from '@angular/router';
import { NominateComponent } from './pages/nominate/nominate.component';
import { HomeComponent } from './pages/home/home.component';
import { NomineesComponent } from './pages/nominees/nominees.component';

export const routes: Routes = [
    {
        path: "nominate",
        component: NominateComponent
    },
    {
        path: "nominees",
        component: NomineesComponent
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
