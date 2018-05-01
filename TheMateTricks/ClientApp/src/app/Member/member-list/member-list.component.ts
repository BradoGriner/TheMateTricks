import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../Services/user-service.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  constructor(private UserServiceService: UserServiceService) { }

  users = [];

  ngOnInit() {

    this.getusers();

  }

  getusers() {
    this.UserServiceService.RetrieveUsers().subscribe(p => this.users = p, err => console.log(err), () => console.log(this.users));
    console.log(this.users);
  }
}
