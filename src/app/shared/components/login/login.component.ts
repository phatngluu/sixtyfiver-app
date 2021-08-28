import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'sf-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  returnUrl: string;

  constructor(
    private messageService: NzMessageService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: NzMessageService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  async submitForm({ username, password }): Promise<void> {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }

    try {
      var isAuthorized = await this.authService.login(username, password);
      if (isAuthorized) {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || ''
        this.router.navigateByUrl(this.returnUrl);
        return;
      }
    } catch (err) {
      console.error(err);
    }
    this.messageService.error("Login failed.");
  }
}
