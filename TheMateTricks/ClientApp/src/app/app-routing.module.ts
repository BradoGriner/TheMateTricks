import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component'
import { HomeComponent } from './home/home.component'
import { MemberListComponent } from './member/member-list/member-list.component';
import { FriendsListComponent } from './friends/friends-list/friends-list.component';
import { MessagesListComponent } from './messages/messages-list/messages-list.component';
const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'members', component: MemberListComponent },
  { path: 'friends', component: FriendsListComponent },
  { path: 'messages', component: MessagesListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
