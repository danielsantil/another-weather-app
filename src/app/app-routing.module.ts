import { CitiesComponent } from './components/cities/cities.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: 'cities', component: CitiesComponent },
    { path: '**', redirectTo: 'cities' },
    { path: '', redirectTo: 'cities', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
