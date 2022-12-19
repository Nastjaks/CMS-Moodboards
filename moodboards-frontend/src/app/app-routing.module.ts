import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostingsOverviewComponent} from "./components/postings-overview/postings-overview.component";
import {MoodboardsOverviewComponent} from "./components/moodboards-overview/moodboards-overview.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {MoodboardDetailComponent} from "./components/moodboard-detail/moodboard-detail.component";

const routes: Routes = [
  {path: '', component: PostingsOverviewComponent},
  {path: 'postings', component: PostingsOverviewComponent},
  {path: 'moodboards', component: MoodboardsOverviewComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'moodboard/:id', component: MoodboardDetailComponent}, //add /:Id
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
