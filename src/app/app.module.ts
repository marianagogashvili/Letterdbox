import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './header/dropdown.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilmsComponent } from './films/films.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './films/search/search.component';
import { WatchedFilmsComponent } from './user/watched-films/watched-films.component';
import { FilmComponent } from './films/film/film.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ActivityComponent } from './user/activity/activity.component';
import { DiaryComponent } from './user/diary/diary.component';
import { ReviewsComponent } from './user/reviews/reviews.component';
import { WatchlistComponent } from './user/watchlist/watchlist.component';
import { LikedComponent } from './user/liked/liked.component';
import { ProfileComponent } from './user/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    FilmsComponent,
    AuthComponent,
    RegisterComponent,
    UserComponent,
    HomeComponent,
    SearchComponent,
    WatchedFilmsComponent,
    FilmComponent,
    LoadingSpinnerComponent,
    ActivityComponent,
    DiaryComponent,
    ReviewsComponent,
    WatchlistComponent,
    LikedComponent,
    ProfileComponent,   

  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    LoadingSpinnerComponent
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
