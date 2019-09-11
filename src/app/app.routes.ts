import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Page Components
import { HomeComponent } from './components/home/app.home.component';

const routes: Routes = [
    {path : 'home', component : HomeComponent},
    // {path : 'not-found', component : NotFoundComponent},
    {path : '', redirectTo : '/home', pathMatch: 'full'}, // catches default URL
    // {path: '**', redirectTo: '/not-found'} // catches wrong URL
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
