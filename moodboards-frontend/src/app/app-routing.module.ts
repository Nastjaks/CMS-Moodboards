import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostingsOverviewComponent} from "./components/posting/postings-overview/postings-overview.component";
import {MoodboardsOverviewComponent} from "./components/moodboards/moodboards-overview/moodboards-overview.component";
import {PageNotFoundComponent} from "./components/general/page-not-found/page-not-found.component";
import {RegisterComponent} from "./components/user/user-register/register.component";
import {LoginComponent} from "./components/user/user-login/login.component";
import {ProfileComponent} from "./components/user/user-profile/profile.component";
import {MoodboardDetailComponent} from "./components/moodboards/moodboard-detail/moodboard-detail.component";
import {HomeComponent} from "./components/general/home/home.component";
import {BlogOverviewComponent} from "./components/blog/blog-overview/blog-overview.component";
import {BlogDetailComponent} from "./components/blog/blog-detail/blog-detail.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'posting/:id', component: HomeComponent},
  {path: 'postings', component: PostingsOverviewComponent},
  {path: 'postings/posting/:id', component: PostingsOverviewComponent},

  {path: 'academy', component: BlogOverviewComponent},
  {path: 'academy/:id', component: BlogDetailComponent},

  {path: 'moodboard/:id', component: MoodboardDetailComponent},
  {path: 'moodboards', component: MoodboardsOverviewComponent},

  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
