import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../Service/storage';

@Component({
  selector: 'app-osc-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './oscforms.html',
  styleUrls: ['./oscforms.css']
})
export class OSCForm implements OnInit {
  oscForm!: FormGroup;
  selectedFile: File | null = null;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  typeViolenceOptions = [
    { value: 'Physique', label: 'Violence Physique' },
    { value: 'Psychologique', label: 'Violence Psychologique et Emotionnelle' },
    { value: 'Sexuelle', label: 'Violence Sexuelle' },
    { value: 'Economique', label: 'Violence Économique' },
    { value: 'Exploitation', label: 'Exploitation Sexuelle' },
    { value: 'Mutilation', label: 'Mutilation' }
  ];

  organRespoOptions = [
    { value: 'ONG Nationale', label: 'ONG Nationale' },
    { value: 'ONG Internationale', label: 'ONG Internationale' },
    { value: 'Association', label: 'Association' },
    { value: 'Organe Confessionnelle', label: 'Organe Confessionnelle' },
    { value: 'Organe DDRH', label: 'Organisation Défense Droits Humains' },
    { value: 'Service Juridique', label: 'Service Juridique' },
    { value: 'Organe Humains', label: 'ONG Humanitaire' }
  ];

  etapeParcoursOptions = [
    { value: 'Identification', label: 'Identification des cas' },
    { value: 'Prise_en_charge', label: 'Prise en charge médicale' },
    { value: 'Enregistrement', label: 'Enregistrement' },
    { value: 'Evaluation', label: 'Évaluation initiale' },
    { value: 'Soutien', label: 'Soutien Psychosocial' },
    { value: 'Referencement', label: 'Assistance Juridique' },
    { value: 'Suivi_cloture', label: 'Suivi et clôture du dossier' }
  ];

  constructor(
    private fb: FormBuilder,
    private storage: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.oscForm = this.fb.group({
      nomComplet: ['', [Validators.required, Validators.minLength(2)]],
      commentaire: [''],
      typeViolence: ['', Validators.required],
      etapeParcours: [''],
      organisationRespo: [''],
      dossierAdministratif: ['']
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async onSubmit(): Promise<void> {
    if (this.oscForm.invalid) {
      this.oscForm.markAllAsTouched();
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    try {
      const formValue = this.oscForm.value;

      let dossierBase64 = null;
      if (this.selectedFile) {
        dossierBase64 = await this.fileToBase64(this.selectedFile);
      }

      const oscData = {
        ...formValue,
        source: 'osc',
        dossierAdministratif: dossierBase64
      };

      this.storage.create(oscData);

      this.isLoading = false;
      this.successMessage = '✅ Formulaire enregistré avec succès !';
      this.resetForm();

      setTimeout(() => this.successMessage = '', 5000);
    } catch (error) {
      this.isLoading = false;
      this.errorMessage = 'Erreur lors de l\'enregistrement';
      setTimeout(() => this.errorMessage = '', 5000);
    }
  }

  resetForm(): void {
    this.oscForm.reset();
    this.selectedFile = null;
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  // Navigation
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  logout(): void {
    this.router.navigate(['/login']);
  }

  // Getters
  get nomComplet() { return this.oscForm.get('nomComplet'); }
  get typeViolence() { return this.oscForm.get('typeViolence'); }
}
