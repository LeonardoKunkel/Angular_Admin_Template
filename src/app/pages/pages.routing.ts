import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';

// Maintenance
import { UsersComponent } from './maintenance/users/users.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { MedicsComponent } from './maintenance/medics/medics.component';
import { MedicComponent } from './maintenance/medics/medic.component';


const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
            { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Account Settings' } },
            { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Graphic 1' } },
            { path: 'profile', component: ProfileComponent, data: { titulo: 'Profile' } },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' } },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promises' } },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },

            // Maintenance
            { path: 'users', component: UsersComponent, data: { titulo: 'App User' } },
            { path: 'hospitals', component: HospitalsComponent, data: { titulo: 'App Hospital' } },
            { path: 'medics', component: MedicsComponent, data: { titulo: 'App Medic' } },
            { path: 'medic/:id', component: MedicComponent, data: { titulo: 'App Medic' } }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
