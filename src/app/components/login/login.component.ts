import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    this.authService.login(this.username, this.password).subscribe(response => {
      console.log('Response:', response);
      if (response.message == 'success') {
        const { id, token, username } = response.data;
        localStorage.setItem('user', JSON.stringify({ id, token, username }));
        this.router.navigate(['/chat']);
      } else {
        this.handleError(response);
      }
    },
    error => {
      this.handleError(error);
    });
  }
  private handleError(error: any) {
    if (error instanceof HttpErrorResponse) {
      const errorMessage = error.error.message || 'Error desconocido';
      alert(`Error: ${errorMessage}`);
    } else {
      alert('Credenciales Invalidas');
    }
    console.error('Error:', error.message);
  }
}