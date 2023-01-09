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
  //Postings
  {path: 'posting/:poId', component: HomeComponent},
  {path: 'postings', component: PostingsOverviewComponent},
  {path: 'postings/posting/:poId', component: PostingsOverviewComponent},
  //Postings -- filter
  {path: 'postings/Color', component: PostingsOverviewComponent},
  {path: 'postings/Color/posting/:poId', component: PostingsOverviewComponent},
  {path: 'postings/Font', component: PostingsOverviewComponent},
  {path: 'postings/Font/posting/:poId', component: PostingsOverviewComponent},
  {path: 'postings/Ui-Element', component: PostingsOverviewComponent},
  {path: 'postings/Ui-Element/posting/:poId', component: PostingsOverviewComponent},
  {path: 'postings/Icon', component: PostingsOverviewComponent},
  {path: 'postings/Icon/posting/:poId', component: PostingsOverviewComponent},
  {path: 'postings/Graphic', component: PostingsOverviewComponent},
  {path: 'postings/Graphic/posting/:poId', component: PostingsOverviewComponent},
  {path: 'postings/Wireframe', component: PostingsOverviewComponent},
  {path: 'postings/Wireframe/posting/:poId', component: PostingsOverviewComponent},
  {path: 'postings/Website-Example', component: PostingsOverviewComponent},
  {path: 'postings/Website-Example/posting/:poId', component: PostingsOverviewComponent},
  {path: 'postings/Other', component: PostingsOverviewComponent},
  {path: 'postings/Othere/posting/:poId', component: PostingsOverviewComponent},
  //Academy
  {path: 'academy', component: BlogOverviewComponent},
  {path: 'academy/:id', component: BlogDetailComponent},
  //Moodboards
  {path: 'moodboards', component: MoodboardsOverviewComponent},
  {path: 'moodboard/:id', component: MoodboardDetailComponent},
  {path: 'moodboard/:id/posting/:poId', component: MoodboardDetailComponent},
  //User
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'profile/posting/:poId', component: ProfileComponent},
  //Error
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
