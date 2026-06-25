import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../Service/storage';
import { Police } from '../../models/Interface';

@Component({
  selector: 'app-police-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './police-dash.html',
  styleUrls: ['./police-dash.css']
})
export class PoliceDash implements OnInit {
  private storage = inject(StorageService);

  polices: Police[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.storage.getData().subscribe(data => {
      this.polices = data.filter(item => item.source === 'police') as Police[];
      this.isLoading = false;
    });
  }

  getViolenceClass(type: string): string {
    const violenceClasses: {[key: string]: string} = {
      'Sexuelle': 'badge-violence-sexual',
      'Physique': 'badge-violence-physical',
      'Psychologique': 'badge-violence-psychological',
      'Economique': 'badge-violence-economic',
      'Exploitation': 'badge-violence-exploitation',
      'Mutilation': 'badge-violence-mutilation'
    };
    return violenceClasses[type] || 'badge-violence';
  }
}
