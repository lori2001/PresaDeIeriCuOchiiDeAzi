import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Page Components
import { HomeComponent } from './components/home/app.home.component';
import { NotFoundComponent } from './components/not-found/app.not-found.component';
import { PressComponent } from './components/press/app.press.component';

const routes: Routes = [
    {path : 'home', component : HomeComponent},
    {path : 'press', component : PressComponent},
    {path : 'not-found', component : NotFoundComponent},
    {path : '', redirectTo : '/home', pathMatch: 'full'}, // catches default URL
    {path: '**', redirectTo: '/not-found'} // catches wrong URL
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
