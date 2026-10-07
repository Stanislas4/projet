import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly STORAGE_KEY = 'vbg_dossiers_local';
  private dataSubject = new BehaviorSubject<any[]>([]);

  constructor() {
    this.loadData();
  }

  private loadData() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      this.dataSubject.next(raw ? JSON.parse(raw) : []);
    } catch {
      this.dataSubject.next([]);
    }
  }

  private saveToLocal(data: any[]) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Stockage local plein ou indisponible', e);
    }
    this.dataSubject.next(data);
  }

  getData(): Observable<any[]> {
    return this.dataSubject.asObservable();
  }

  getDataSnapshot() {
    return this.dataSubject.value;
  }

  getByType(type: string) {
    return this.dataSubject.value.filter(i => i.source === type);
  }

  getPolice() { return this.getByType('police'); }
  getSante() { return this.getByType('sante'); }
  getJustice() { return this.getByType('justice'); }
  getOSC() { return this.getByType('osc'); }

  getStats() {
    const data = this.dataSubject.value;
    const byType = data.reduce((acc: any, item: any) => {
      acc[item.source] = (acc[item.source] || 0) + 1;
      return acc;
    }, {});
    return { total: data.length, byType };
  }

  async create(formData: any) {
    const newItem = {
      ...formData,
      id: 'VBG-' + Date.now(),
      createdAt: new Date().toISOString(),
      type_violence: formData.typeViolence || formData.type_violence,
      source: formData.source
    };
    this.saveToLocal([newItem, ...this.dataSubject.value]);
    return newItem;
  }

  async update(id: string, changes: any) {
    const updated = this.dataSubject.value.map(i =>
      i.id === id ? { ...i, ...changes } : i
    );
    this.saveToLocal(updated);
  }

  async delete(id: string) {
    this.saveToLocal(this.dataSubject.value.filter(i => i.id !== id));
  }

  clearAll() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.dataSubject.next([]);
  }
}
