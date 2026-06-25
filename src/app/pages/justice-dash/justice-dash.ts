import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Justice } from '../../models/Interface';
import { StorageService } from '../../Service/storage';

@Component({
  selector: 'app-justice-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './justice-dash.html',
  styleUrls: ['./justice-dash.css']
})
export class JusticeDash implements OnInit {
  private storage = inject(StorageService);

  signalements: Justice[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.storage.getData().subscribe(data => {
      this.signalements = data.filter(item => item.source === 'justice') as Justice[];
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
