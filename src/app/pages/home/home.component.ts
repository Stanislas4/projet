import { Component, inject, OnInit } from '@angular/core';
import { StorageService } from '../../Service/storage';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DatePipe, FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  private storage = inject(StorageService);
  private router = inject(Router);

  stats = {
    police: 0,
    justice: 0,
    osc: 0,
    sante: 0
  };

  totalGeneral = 0;
  recentItems: any[] = [];
  activities: any[] = [];
  violenceDistribution: any[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData(): void {
    this.isLoading = true
    this.storage.getData().subscribe({
      next: (data) => {
        const policeData = data.filter(item => item.source === 'police');
        const justiceData = data.filter(item => item.source === 'justice');
        const oscData = data.filter(item => item.source === 'osc');
        const santeData = data.filter(item => item.source === 'sante');

        this.stats.police = policeData.length;
        this.stats.justice = justiceData.length;
        this.stats.osc = oscData.length;
        this.stats.sante = santeData.length;

        this.addRecentItems(policeData, 'police');
        this.addRecentItems(justiceData, 'justice');
        this.addRecentItems(oscData, 'osc');
        this.addRecentItems(santeData, 'sante');

        this.recentItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        this.recentItems = this.recentItems.slice(0, 10);

        this.updateViolenceDistribution(data);

        this.updateTotal();

        this.generateActivities(data);

        this.isLoading = false;
      },

      error: (err) => {
        console.error('Erreur chargement:', err);
        this.isLoading = false;
      }
    })
  }

  addRecentItems(data: any[], page: string): void {
    data.forEach(item => {
      this.recentItems.push({
        id: item.id,
        nom: item.nomComplet,
        page: page,
        date: item.createdAt || item.date_debut_procedure || item.date_agression || new Date(),
        type: item.typeViolence
      })
    })
  }

  updateViolenceDistribution(data: any[]): void {
    const violenceMap = new Map<string, number>();

    data.forEach(item => {
      const type = item.typeViolence;
      if (type) {
        violenceMap.set(type, (violenceMap.get(type) || 0) + 1);

      }
    })

    const total = data.length;
    this.violenceDistribution = Array.from(violenceMap.entries())
      .map(([label, count]) => ({
        label: this.getViolenceLabel(label),
        count: count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0
      }))

      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }

  updateTotal(): void {
    this.totalGeneral = this.stats.police + this.stats.justice + this.stats.osc + this.stats.sante;
  }

  generateActivities(data: any[]): void {
    const recent = data
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);

    this.activities = recent.map(item => ({
      type: item.source,
      text: `Nouveau signalement ${this.getSourceLabel(item.source)} enregistré`,
      time: item.createdAt,
      nom: item.nomComplet
    }))

    if (this.activities.length === 0) {
      this.activities = [
        { type: 'police', text: 'En attente de signalements Police', time: new Date() },
        { type: 'justice', text: 'En attente de signalements Justice', time: new Date() },
        { type: 'osc', text: 'En attente de signalements OSC', time: new Date() },
        { type: 'sante', text: 'En attente de dossiers Santé', time: new Date() }
      ]
    }
  }

  getSourceLabel(source: string): string {
    const labels: Record<string, string> = {
      police: 'Police',
      justice: 'Justice',
      osc: 'OSC',
      sante: 'Santé'
    }

    return labels[source] || source;
  }

  navigateTo(page: string): void {
    this.router.navigate([`/dashboard/${page}`])
  }

  navigateToForms(page: string): void {
    this.router.navigate([`/${page}`])
  }

  viewAllRecent(): void {
    if (this.recentItems.length > 0) {
      this.navigateTo(this.recentItems[0]?.page || 'police');
    }
  }

  getViolenceLabel(type: string): string {
    const labels: { [key: string]: string } = {
      'Mariage_force': 'Mariage forcé',
      'Mutilation': 'Mutilation',
      'Exploitation': 'Exploitation sexuelle',
      'Physique': 'Violence physique',
      'Psychologique': 'Violence psychologique',
      'Sexuelle': 'Violence sexuelle',
      'Economique': 'Violence économique',
    }
    return labels[type] || type;
  }

  getTypeClass(type: string): string {
    const classes: { [key: string]: string } = {
      'Sexuelle': 'badge-violence-sexual',
      'Physique': 'badge-violence-physical',
      'Psychologique': 'badge-violence-psychological',
      'Mariage_force': 'badge-violence-marriage',
      'Economique': 'badge-violence-economic',
      'Mutilation': 'badge-violence-mutilation',
      'Exploitation': 'badge-violence-exploitation'
    };

    return classes[type] || 'badge-violence'
  }

}
