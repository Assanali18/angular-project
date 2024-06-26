import { Component } from '@angular/core';
import { AuthService } from '../../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {
  constructor(
    public auth: AuthService,
    private router: Router
  ){}

  logout($event: any){
    event?.preventDefault();
    this.auth.logout();
    this.router.navigate(['/admin', 'login'])
  }


}
