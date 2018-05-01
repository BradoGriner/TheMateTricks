import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './Member/member-list/member-list.component';
import { FriendsListComponent } from './friends-list/friends-list.component';
import { MessagesComponent } from './messages/messages.component';

const routes: Routes = [
  { path: 'Register', component: RegisterComponent },
  { path: 'Home', component: HomeComponent },
  { path: '**', redirectTo: 'Home' },
  { path: 'members', component: MemberListComponent },
  { path: 'friends', component: FriendsListComponent },
  { path: 'messages', component: MessagesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
