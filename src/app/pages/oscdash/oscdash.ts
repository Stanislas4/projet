import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../Service/storage';
import { OSC } from '../../models/Interface';

@Component({
  selector: 'app-osc-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './oscdash.html',
  styleUrls: ['./oscdash.css']
})
export class OscDash implements OnInit {
  private storage = inject(StorageService);

  ongs: OSC[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.storage.getData().subscribe(data => {
      this.ongs = data.filter(item => item.source === 'osc') as OSC[];
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
