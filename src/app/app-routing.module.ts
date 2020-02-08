import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { Routes, RouterModule } from '@angular/router'; 
const appRoutes: Routes = [
	{path: '', component: HeaderComponent},

];
@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule {

}