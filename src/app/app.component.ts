import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PaidPlansTableComponent } from './pages/paid-plans-table/paid-plans-table.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PaidPlansTableComponent, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'CloudPano Pricing Plans';
}
