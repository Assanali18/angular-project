import { Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent{
  form: FormGroup = new FormGroup({
      email:new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
  });

  constructor(
    public auth: AuthService,
    private router:  Router,
  ) {}
  
  submit() {

    const user = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true
    }
    this.auth.login(user).subscribe(res =>{      
      this.form.reset;
      this.router.navigate(['/admin', 'dashboard']);
    }
    )
    
  }
  
}
