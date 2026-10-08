import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { supabase } from '../supabase.client';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private dataSubject = new BehaviorSubject<any[]>([]);

  constructor() { this.charger(); }

  async charger() {
    const { data, error } = await supabase
      .from('dossiers')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) { console.error(error); return; }

    // Aplatit pour que les dashboards retrouvent typeViolence, createdAt, etc.
    const liste = (data ?? []).map((d: any) => ({
      ...d.details,
      ...d,
      typeViolence: d.type_violence,
      createdAt: d.created_at
    }));
    this.dataSubject.next(liste);
  }

  getData(): Observable<any[]> { return this.dataSubject.asObservable(); }
  getDataSnapshot() { return this.dataSubject.value; }
  getByType(type: string) { return this.dataSubject.value.filter(i => i.source === type); }
  getPolice() { return this.getByType('police'); }
  getSante() { return this.getByType('sante'); }
  getJustice() { return this.getByType('justice'); }
  getOSC() { return this.getByType('osc'); }

  getStats() {
    const data = this.dataSubject.value;
    const byType = data.reduce((acc: any, i: any) => {
      acc[i.source] = (acc[i.source] || 0) + 1;
      return acc;
    }, {});
    return { total: data.length, byType };
  }

  async create(source: string, dossier: any, identite?: any) {
    const { typeViolence, type_violence, date_faits, lieu, ...details } = dossier;

    const { data, error } = await supabase
      .from('dossiers')
      .insert({ source, type_violence: typeViolence ?? type_violence, date_faits, lieu, details })
      .select()
      .single();
    if (error) throw error;

    if (identite) {
      const { nom, telephone, adresse, ...donnees } = identite;
      const { error: e2 } = await supabase
        .from('identites')
        .insert({ dossier_id: data.id, source, nom, telephone, adresse, donnees });
      if (e2) throw e2;
    }
    await this.charger();
    return data;
  }

  async getIdentite(dossierId: string) {
    const { data } = await supabase
      .from('identites')
      .select('*')
      .eq('dossier_id', dossierId)
      .maybeSingle();
    return data; // null si non autorisé
  }

  async delete(id: string) {
    await supabase.from('dossiers').delete().eq('id', id);
    await this.charger();
  }
}
