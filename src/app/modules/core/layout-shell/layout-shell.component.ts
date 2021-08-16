import { Role } from './../../../shared/models/auth-credential';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../../shared/services/auth.service';
import { AuthGuard } from './../../../auth.guard';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sf-layout-shell',
  templateUrl: './layout-shell.component.html',
  styleUrls: ['./layout-shell.component.css']
})
export class LayoutShellComponent implements OnInit {

  public role = {
    Admin: 'Admin',
    User: 'User',
    MinistryOfHealth: 'MinistryOfHealth',
    MedicalUnit: 'MedicalUnit',
    Doctor: 'Doctor',
    Injector: 'Injector',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('login');
  }

  notRole(role: string) {
    return this.authService.userCredential.role !== role;
  }
}
