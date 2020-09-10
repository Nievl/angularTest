import {
  Component,
  OnInit,
  Inject,
  Output,
  EventEmitter,
  Input,
} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormControl, Validators } from "@angular/forms";
import { UserService } from "../user.service";

@Component({
  selector: "app-user-modal",
  templateUrl: "./user-modal.component.html",
  styleUrls: ["./user-modal.component.scss"],
})
export class UserModalComponent implements OnInit {
  @Input() updateUser;
  constructor(
    @Inject(MAT_DIALOG_DATA) public user,
    private dialogRef: MatDialogRef<UserModalComponent>,
    private _userService: UserService
  ) {}
  fullName: FormControl;

  ngOnInit(): void {
    this.fullName = new FormControl(this.user.full_name, [
      Validators.minLength(5),
      Validators.required,
    ]);
  }

  Submit(event: Event) {
    event.preventDefault();
    if (!this.fullName.errors) {
      this.dialogRef.close({
        name: this.user.username,
        full_name: this.fullName.value,
      });
    }
  }
}
