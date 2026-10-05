import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { supabase } from '../supabase.client';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private dataSubject = new BehaviorSubject<any[]>([]);

  constructor() {
    this.loadData();
  }

  private async loadData() {
    const { data, error } = await supabase
      .from('vbg_dossiers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) { console.error(error); return; }

    // On remet le format que tes dashboards attendent déjà
    const mapped = (data || []).map((row: any) => ({
      ...row.data, // tout ton formulaire
      id: row.id,
      source: row.source,
      type_violence: row.type_violence,
      createdAt: row.created_at
    }));
    this.dataSubject.next(mapped);
  }

  // Ce que tes dashboards utilisent déjà
  getData() { return this.dataSubject.asObservable(); }
  getDataSnapshot() { return this.dataSubject.value; }
  getByType(type: string) { return this.dataSubject.value.filter(i => i.source === type); }

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
    const { data, error } = await supabase
      .from('vbg_dossiers')
      .insert([{
        source: formData.source, // police, sante, justice, osc
        type_violence: formData.type_violence || formData.type || null,
        data: formData // tout le formulaire en jsonb
      }])
      .select()
      .single();

    if (error) throw error;

    const newItem = { ...formData, id: data.id, createdAt: data.created_at };
    this.dataSubject.next([newItem, ...this.dataSubject.value]);
    return newItem;
  }

  async delete(id: string) {
    await supabase.from('vbg_dossiers').delete().eq('id', id);
    this.dataSubject.next(this.dataSubject.value.filter(i => i.id !== id));
  }
}

