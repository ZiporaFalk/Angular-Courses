import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule, MatToolbarRow } from '@angular/material/toolbar';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'home-page',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatButtonModule, MatToolbarModule, RouterModule, MatToolbarRow],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  constructor(private authService: AuthService) { } // הזרקת השירות לקומפוננטה

  onLogout() {
    this.authService.Logout();
    console.log('User has been logged out');
  }
}
