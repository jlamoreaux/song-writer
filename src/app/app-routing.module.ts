import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SongsComponent } from './songs/songs.component';
import { ProfileComponent } from './profile/profile.component';
import { CreatorComponent } from './creator/creator.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SongDetailComponent } from './song-detail/song-detail.component';

const routes: Routes = [
  { path: 'songs', component: SongsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'new', component: CreatorComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: SongDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
