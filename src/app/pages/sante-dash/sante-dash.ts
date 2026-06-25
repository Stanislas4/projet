import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../Service/storage';
import { Sante } from '../../models/Interface';

@Component({
  selector: 'app-sante-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sante-dash.html',
  styleUrls: ['./sante-dash.css']
})

export class SanteDash implements OnInit {
  private storage = inject(StorageService);

  santes: Sante[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.storage.getData().subscribe(data => {
      this.santes = data.filter(item => item.source === 'sante') as Sante[];
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
