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
import { NotFoundComponent } from './not-found/not-found.component';
import { FoundComponent } from './films/found/found.component';
import { AuthGuard } from './auth-guard.service';
import { SettingsComponent } from './user/settings/settings.component';
import { PeopleComponent } from './people/people.component';

const appRoutes: Routes = [
	{path: '', redirectTo: '/home', pathMatch: 'full'},
	{path: 'home', component: HomeComponent},
	{path: 'user', canActivate:[AuthGuard], component: UserComponent, children: [
		{path: 'films', component: WatchedFilmsComponent},
		{path: 'activity', component: ActivityComponent},
		{path: 'diary', component: DiaryComponent},
		{path: 'reviews', component: ReviewsComponent},
		{path: 'watchlist', component: WatchlistComponent},
		{path: 'liked', component: LikedComponent},
		{path: 'profile', component: ProfileComponent},
		{path: 'own-lists', component: OwnListsComponent},
	]},
	{path: 'settings', canActivate:[AuthGuard], component: SettingsComponent},
	{path: 'user/:id', component: UserComponent, children: [
		{path: 'films', component: WatchedFilmsComponent},
		{path: 'activity', component: ActivityComponent},
		{path: 'diary', component: DiaryComponent},
		{path: 'reviews', component: ReviewsComponent},
		{path: 'watchlist', component: WatchlistComponent},
		{path: 'liked', component: LikedComponent},
		{path: 'profile', component: ProfileComponent},
		{path: 'own-lists', component: OwnListsComponent},

	]},
	{path: 'films', component: FilmsComponent},
	{path: 'films/:id', component: FilmComponent},
	{path: 'found', component: FoundComponent},
	{path: 'lists', component: ListsComponent},
	{path: 'lists/new', canActivate:[AuthGuard], component: NewListComponent},
	{path: 'lists/edit/:id', canActivate:[AuthGuard], component: EditListComponent},
	{path: 'lists/:id', component: ListComponent},
	{path: 'people', component: PeopleComponent},
	{path: '**', component: NotFoundComponent}
];
@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule {

}