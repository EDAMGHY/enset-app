import { Component } from '@angular/core';
import { AppStateService } from '../services/app-state.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { IUser } from '../types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public appState: AppStateService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
    });
  }

  async handleLogin() {
    try {
      const { username = '', password = '' } = this.loginForm.value;
      await this.auth.login(username, password);
      this.appState.setAuthState({ status: 'SUCCESS', errorMessage: '' });
      this.router.navigateByUrl('/admin');
    } catch (err: any) {
      this.appState.setAuthState({
        isError: true,
        isLoading: true,
        errorMessage: err,
      });
    }
  }
}
