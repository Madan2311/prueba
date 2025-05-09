import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';

@Component({
  standalone: true,
  selector: 'app-sign-in',
  imports: [RouterModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  userName: string = '';
  password: string = '';
  confirmPassword: string = '';
  constructor(private toastr: ToastrService, private _userService: UserService) { }

  addUser() {
    if (this.userName == '' || this.password == '' || this.confirmPassword == '') {
      this.toastr.error('Por favor, complete todos los campos', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right',
        progressBar: true,
        progressAnimation: 'increasing'
      });
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.toastr.error('Las contraseñas no coinciden', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right',
        progressBar: true,
        progressAnimation: 'increasing'
      });
      return;
    }

    const user: User = {
      userName: this.userName,
      password: this.password
    }

    this._userService.signIn(user).subscribe(data => {
      if (data) {
        this.toastr.success('Usuario creado con éxito', 'Éxito', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
          progressBar: true,
          progressAnimation: 'increasing'
        });
      } else {
        this.toastr.error('Error al crear el usuario', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
          progressBar: true,
          progressAnimation: 'increasing'
        });
      }
    })

  }
}
