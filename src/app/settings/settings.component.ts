import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    // Navigate to the default dashboard content when the component loads
    this.router.navigate(['/settings/preferences']);
  }

  onTabChange(tabIndex: number) {
    switch (tabIndex) {
      case 0:
        this.router.navigate(['/settings/preferences']);
        break;

    }
  }
}
