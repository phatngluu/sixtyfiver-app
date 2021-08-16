import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'sf-pethernet',
  templateUrl: './pethernet.component.html',
  styleUrls: ['./pethernet.component.css'],
})
export class PethernetComponent implements OnInit {
  public role = {
    Admin: 'Admin',
    User: 'User',
    MinistryOfHealth: 'MinistryOfHealth',
    MedicalUnit: 'MedicalUnit',
    Doctor: 'Doctor',
    Injector: 'Injector',
  };


  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  notRole(role: string) {
    return this.authService.userCredential.role !== role;
  }
}
