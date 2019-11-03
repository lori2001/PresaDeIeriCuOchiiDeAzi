import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Page Components
import { HomeComponent } from './components/home/app.home.component';
import { NotFoundComponent } from './components/not-found/app.not-found.component';
import { BvPressComponent } from './components/bv-press/app.bv-press.component';
import { SbPressComponent } from './components/sb-press/app.sb-press.component';

const routes: Routes = [
    {path : 'home', component : HomeComponent},
    {path : 'bv-press', component : BvPressComponent},
    {path : 'sb-press', component : SbPressComponent},
    {path : 'not-found', component : NotFoundComponent},
    {path : '', redirectTo : '/home', pathMatch: 'full'}, // catches default URL
    {path: '**', redirectTo: '/not-found'} // catches wrong URL
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
