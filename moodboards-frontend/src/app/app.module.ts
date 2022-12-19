import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavigationComponent} from './components/navigation/navigation.component';
import {PostingsOverviewComponent} from './components/postings-overview/postings-overview.component';
import {MoodboardsOverviewComponent} from './components/moodboards-overview/moodboards-overview.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {HttpClientModule} from "@angular/common/http";
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {httpInterceptorProviders} from "./helper/http.interceptor";
import {ProfileComponent} from './components/profile/profile.component';
import {SinglePostingCardComponent} from './components/single-posting-card/single-posting-card.component';
import {SingleMoodboardCardComponent} from './components/single-moodboard-card/single-moodboard-card.component';
import {PostingDetailComponent} from './components/posting-detail/posting-detail.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from "@angular/material/button";
import { AlertComponent } from './components/alert/alert.component';
import { MoodboardDetailComponent } from './components/moodboard-detail/moodboard-detail.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CreatePostingComponent } from './components/create-posting/create-posting.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    PostingsOverviewComponent,
    MoodboardsOverviewComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    SinglePostingCardComponent,
    SingleMoodboardCardComponent,
    PostingDetailComponent,
    AlertComponent,
    MoodboardDetailComponent,
    CreatePostingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
