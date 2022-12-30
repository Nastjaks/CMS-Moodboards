import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavigationComponent} from './components/general/navigation/navigation.component';
import {PostingsOverviewComponent} from './components/posting/postings-overview/postings-overview.component';
import {MoodboardsOverviewComponent} from './components/moodboards/moodboards-overview/moodboards-overview.component';
import {PageNotFoundComponent} from './components/general/page-not-found/page-not-found.component';
import {HttpClientModule} from "@angular/common/http";
import {LoginComponent} from './components/user/user-login/login.component';
import {RegisterComponent} from './components/user/user-register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {httpInterceptorProviders} from "./helper/http.interceptor";
import {ProfileComponent} from './components/user/user-profile/profile.component';
import {SinglePostingCardComponent} from './components/posting/single-posting-card/single-posting-card.component';
import {SingleMoodboardCardComponent} from './components/moodboards/single-moodboard-card/single-moodboard-card.component';
import {PostingDetailComponent} from './components/posting/posting-detail-dialog/posting-detail.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from "@angular/material/button";
import {AlertComponent} from './components/general/alert/alert.component';
import {MoodboardDetailComponent} from './components/moodboards/moodboard-detail/moodboard-detail.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {CreatePostingComponent} from './components/posting/posting-create-dialog/create-posting.component';
import {Urls} from './helper/urls';
import { DeleteDialogComponent } from './components/user/user-delete-dialog/delete-dialog.component';
import { DeletePostingDialogComponent } from './components/posting/posting-delete-dialog/delete-posting-dialog.component';
import { DeleteMoodboardDialogComponent } from './components/moodboards/moodboard-delete-dialog/delete-moodboard-dialog.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatLegacyChipsModule} from "@angular/material/legacy-chips";
import { MoodboardCreateDialogComponent } from './components/moodboards/moodboard-create-dialog/moodboard-create-dialog.component';
import { MoodboardEditDialogComponent } from './components/moodboards/moodboard-edit-dialog/moodboard-edit-dialog.component';

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
    DeleteDialogComponent,
    DeletePostingDialogComponent,
    DeleteMoodboardDialogComponent,
    MoodboardCreateDialogComponent,
    MoodboardEditDialogComponent,

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
    MatSnackBarModule,
    MatSlideToggleModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatLegacyChipsModule,
  ],
  providers: [httpInterceptorProviders, Urls],
  bootstrap: [AppComponent]
})
export class AppModule {
}
