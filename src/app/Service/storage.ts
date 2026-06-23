import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';import { Justice, OSC, Police, Sante } from '../models/Interface';
;

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly STORAGE_KEY = 'vbg_forms_data';
  private dataSubject = new BehaviorSubject<any[]>([]);

  constructor() {
    this.loadData();
  }

  private loadData(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        this.dataSubject.next(JSON.parse(stored));
      } else {
        this.dataSubject.next([]);
      }
    } catch (e) {
      console.error('Erreur chargement:', e);
      this.dataSubject.next([]);
    }
  }

  private saveData(data: any[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    this.dataSubject.next(data);
  }
  getData(): Observable<any[]> {
    return this.dataSubject.asObservable();
  }
  getDataSnapshot(): any[] {
    return this.dataSubject.value;
  }

  getByType(type: string): any[] {
    return this.dataSubject.value.filter(item => item.source === type);
  }

  getJustice(): Justice[] {
    return this.getByType('justice') as Justice[];
  }

  getOSC(): OSC[] {
    return this.getByType('osc') as OSC[];
  }

  getPolice(): Police[] {
    return this.getByType('police') as Police[];
  }

  getSante(): Sante[] {
    return this.getByType('sante') as Sante[];
  }

  create(data: any): any {
    const all = this.dataSubject.value;
    const newItem = {
      ...data,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    all.push(newItem);
    this.saveData(all);
    return newItem;
  }

  update(id: string, updates: any): any | null {
    const all = this.dataSubject.value;
    const index = all.findIndex(item => item.id === id);
    if (index === -1) return null;

    all[index] = {
      ...all[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.saveData(all);
    return all[index];
  }

  delete(id: string): boolean {
    const all = this.dataSubject.value;
    const filtered = all.filter(item => item.id !== id);
    if (filtered.length === all.length) return false;
    this.saveData(filtered);
    return true;
  }

  deleteAll(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.dataSubject.next([]);
  }

  getStats(): any {
    const data = this.dataSubject.value;
    const byType = data.reduce((acc, item) => {
      acc[item.source] = (acc[item.source] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const byViolence = data.reduce((acc, item) => {
      acc[item.typeViolence] = (acc[item.typeViolence] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: data.length,
      byType,
      byViolence
    };
  }

  exportData(): string {
    const data = this.dataSubject.value;
    return JSON.stringify(data, null, 2);
  }

  importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      if (Array.isArray(data)) {
        this.saveData(data);
        return true;
      }
      return false;
    } catch (e) {
      console.error('Erreur d\'import:', e);
      return false;
    }
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }
}
