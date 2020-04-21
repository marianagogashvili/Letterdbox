import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { WatchedFilmsComponent } from './user/watched-films/watched-films.component';
import { Routes, RouterModule } from '@angular/router'; 
import { FilmComponent } from './films/film/film.component';

import { FilmsComponent } from './films/films.component';
import { ActivityComponent } from './user/activity/activity.component';
import { DiaryComponent } from './user/diary/diary.component';
import { ReviewsComponent } from './user/reviews/reviews.component';
import { WatchlistComponent } from './user/watchlist/watchlist.component';
import { LikedComponent } from './user/liked/liked.component';
import { ProfileComponent } from './user/profile/profile.component';
import { OwnListsComponent } from './user/own-lists/own-lists.component';
import { ListsComponent } from './lists/lists.component';
import { NewListComponent } from './lists/new-list/new-list.component';
import { EditListComponent } from './lists/edit-list/edit-list.component';
import { ListComponent } from './lists/list/list.component';

const appRoutes: Routes = [
	{path: '', redirectTo: '/home', pathMatch: 'full'},
	{path: 'home', component: HomeComponent},
	{path: 'user', component: UserComponent, children: [
		{path: 'films', component: WatchedFilmsComponent},
		{path: 'activity', component: ActivityComponent},
		{path: 'diary', component: DiaryComponent},
		{path: 'reviews', component: ReviewsComponent},
		{path: 'watchlist', component: WatchlistComponent},
		{path: 'liked', component: LikedComponent},
		{path: 'profile', component: ProfileComponent},
		{path: 'own-lists', component: OwnListsComponent}
	]},
	{path: 'films', component: FilmsComponent},
	{path: 'films/:id', component: FilmComponent},
	{path: 'lists', component: ListsComponent},
	{path: 'lists/new', component: NewListComponent},
	{path: 'lists/edit/:id', component: EditListComponent},
	{path: 'lists/:id', component: ListComponent},

];
@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule {

}