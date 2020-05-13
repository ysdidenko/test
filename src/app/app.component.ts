import { Component } from "@angular/core";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";

export interface User {
  editing: boolean;
  name?: string;
  email?: string;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "Test for Aida";
  editingUser = false;
  addingNewUser = false;

  users: User[] = [];

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = new FormGroup({});
  }

  enableForm(user?: User): void {
    this.form = this.fb.group({
      name: [user?.name],
      email: [user?.email, Validators.email],
    });
  }

  addUser() {
    this.enableForm();
    this.editingUser = false;
    this.addingNewUser = true;
  }

  editUser(user: User): void {
    this.addingNewUser = false;
    this.editingUser = true;
    user.editing = true;
    this.enableForm(user);
  }

  save(): void {
    if (this.addingNewUser) {
      this.users.push(this.form.value);
    } else {
      const targetUser = this.users.find((user) => !!user.editing);
      targetUser.email = this.form.value.email;
      targetUser.name = this.form.value.name;
    }
    this.cancel();
  }

  cancel(): void {
    this.users.forEach((user) => (user.editing = false));
    this.editingUser = false;
    this.addingNewUser = false;
  }
}
