import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { WatchedFilmsComponent } from './user/watched-films/watched-films.component';
import { Routes, RouterModule } from '@angular/router'; 
const appRoutes: Routes = [
	{path: '', redirectTo: '/home', pathMatch: 'full'},
	{path: 'home', component: HomeComponent},
	{path: 'user', component: UserComponent, children: [
		{path: 'films', component: WatchedFilmsComponent}
	]}
];
@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule {

}