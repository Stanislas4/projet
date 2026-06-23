import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  activePage: string = 'home';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const url = this.router.url;
      if (url.includes('/police')) {
        this.activePage = 'police';
      } else if (url.includes('/justice')) {
        this.activePage = 'justice';
      } else if (url.includes('/osc')) {
        this.activePage = 'osc';
      } else if (url.includes('/sante')) {
        this.activePage = 'sante';
      } else if (url === '/dashboard' || url === '/dashboard/home') {
        this.activePage = 'home';
      }
    });
  }

  navigateTo(page: string): void {
    this.activePage = page;
    if (page === 'home') {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate([`/dashboard/${page}`]);
    }
  }

  isActive(page: string): boolean {
    return this.activePage === page;
  }

  logout(): void {
    this.router.navigate(['/login']);
  }
}
