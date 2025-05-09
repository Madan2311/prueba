import { Component } from '@angular/core';
import { RouterOutlet, RouterModule  } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { SignInComponent } from "./components/sign-in/sign-in.component";

@Component({
  selector: 'app-root',
  imports: [LoginComponent, SignInComponent, RouterOutlet, RouterModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
