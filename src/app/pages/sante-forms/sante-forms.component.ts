import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../Service/storage';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sante-forms',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sante-forms.component.html',
  styleUrl: './sante-forms.component.css'
})
export class SanteFormsComponent {
  santeForm!: FormGroup;
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

  sexeOptions = [
    { value: 'M', label: 'Masculin' },
    { value: 'F', label: 'Féminin' }
  ];

  cessionnaireOptions = [
    { value: 'Travailleur Social', label: 'Travailleur social' },
    { value: 'Psychologue', label: 'Psychologue' },
    { value: 'Service Juridique', label: 'Service Juridique' },
    { value: 'Medecin', label: 'Médecin' },
    { value: 'ONG Partenaire', label: 'ONG Partenaire' }
  ];

  structureRespoOptions = [
    { value: 'Hopital', label: 'Hôpital' },
    { value: 'Centre Sante', label: 'Centre de Santé' },
    { value: 'Service Juridique', label: 'Service Juridique' },
    { value: 'ONG', label: 'ONG Partenaire' }
  ];

  pepVihOptions = [
    { value: 'Oui administre', label: 'Oui (administré)' },
    { value: 'Non', label: 'Non' },
    { value: 'Non Applicable', label: 'Non Applicable' },
    { value: 'Refuse', label: 'Refusé' },
    { value: 'Inconnu', label: 'Inconnu' }
  ];

  hospitalisationOptions = [
    { value: 'Oui', label: 'Oui' },
    { value: 'Non', label: 'Non' },
    { value: 'Observation courte', label: 'Observation courte' },
    { value: 'Autre Structure', label: 'Référé vers une autre structure' }
  ];

  constructor(
    private fb: FormBuilder,
    private storage: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.santeForm = this.fb.group({
      nomComplet: ['', [Validators.required, Validators.minLength(2)]],
      commentaire: [''],
      age: ['', [Validators.required, Validators.min(0), Validators.max(150)]],
      sexe: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]{8,15}$')]],
      cessionnaire: [''],
      dateAgression: ['', Validators.required],
      typeViolence: ['', Validators.required],
      lesionConstates: [''],
      structureRespo: [''],
      examenFait: [''],
      medicamentDonnes: [''],
      pepVih: [''],
      hospitalisation: [''],
      etapeDossier: ['']
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
    if (this.santeForm.invalid) {
      this.santeForm.markAllAsTouched();
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    try {
      const formValue = this.santeForm.value;

      let pieceJointeBase64 = null;
      if (this.selectedFile) {
        pieceJointeBase64 = await this.fileToBase64(this.selectedFile);
      }

      const santeData = {
        ...formValue,
        source: 'sante',
        dateAgression: new Date(formValue.dateAgression).toISOString(),
        pieceJointe: pieceJointeBase64
      };

      this.storage.create(santeData);

      this.isLoading = false;
      this.successMessage = 'Formulaire enregistré avec succès !';
      this.resetForm();

      setTimeout(() => this.successMessage = '', 5000);
    } catch (error) {
      this.isLoading = false;
      this.errorMessage = 'Erreur lors de l\'enregistrement';
      setTimeout(() => this.errorMessage = '', 5000);
    }
  }

  resetForm(): void {
    this.santeForm.reset();
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
  get nomComplet() { return this.santeForm.get('nomComplet'); }
  get age() { return this.santeForm.get('age'); }
  get sexe() { return this.santeForm.get('sexe'); }
  get contact() { return this.santeForm.get('contact'); }
  get dateAgression() { return this.santeForm.get('dateAgression'); }
  get typeViolence() { return this.santeForm.get('typeViolence'); }
}
