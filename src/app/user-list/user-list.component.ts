import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { UserModalComponent } from "../user-modal/user-modal.component";
import { UserService } from "../user.service";

export type Iuser = { id: number; username: string; full_name: string };

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
})
export class UserListComponent implements OnInit {
  public userList: Iuser[];
  public selected;

  constructor(public dialog: MatDialog, private _userService: UserService) {}

  ngOnInit(): void {
    this._userService.getAll().subscribe((users: Iuser[]) => {
      this.userList = users;
    });
  }

  selectUser(user) {
    this.selected = user;
    const dialogRef = this.dialog.open(UserModalComponent, { data: user });
    dialogRef
      .afterClosed()
      .subscribe((result) => this.updateUser(result.name, result.full_name));
  }

  updateUser(username: string, fullName: string) {
    this._userService.update(username, fullName).subscribe((result: Iuser) => {
      this.userList = this.userList.map((user) => {
        if (user.username === result.username) {
          return result;
        } else {
          return user;
        }
      });
      this.dialog.closeAll();
    });
  }
}
