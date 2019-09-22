import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Page Components
import { HomeComponent } from './components/home/app.home.component';
import { TeamComponent } from './components/team/app.team.component';
import { NotFoundComponent } from './components/not-found/app.not-found.component';
import { SibiuPressComponent } from './components/sibiu-press/app.sibiu-press.component';

const routes: Routes = [
    {path : 'home', component : HomeComponent},
    {path : 'team', component : TeamComponent},
    {path : 'brasov-press', component : SibiuPressComponent},
    {path : 'sibiu-press', component : SibiuPressComponent},
    {path : 'not-found', component : NotFoundComponent},
    {path : '', redirectTo : '/home', pathMatch: 'full'}, // catches default URL
    {path: '**', redirectTo: '/not-found'} // catches wrong URL
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
