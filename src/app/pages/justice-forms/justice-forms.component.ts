import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageService } from '../../Service/storage';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-justice-forms',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './justice-forms.component.html',
  styleUrl: './justice-forms.component.css'
})
export class JusticeFormsComponent {
  justiceForm!: FormGroup;
  selectedPhoto: File | null = null;
  selectedCartePhoto: File | null = null;
  photoPreview: string | null = null;
  cartePhotoPreview: string | null = null;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  // Options
  typeViolenceOptions = [
    { value: 'Physique', label: 'Violence Physique' },
    { value: 'Psychologique', label: 'Violence Psychologique et Emotionnelle' },
    { value: 'Sexuelle', label: 'Violence Sexuelle' },
    { value: 'Economique', label: 'Violence Économique' },
    { value: 'Exploitation', label: 'Exploitation Sexuelle' },
    { value: 'Mutilation', label: 'Mutilation' }
  ];

  roleAffaireOptions = [
    { value: 'Victime', label: 'Victime ou Survivant' },
    { value: 'Temoin', label: 'Témoin' },
    { value: 'Auteur presume', label: 'Auteur présumé' },
    { value: 'Accuse', label: 'Accusé' },
    { value: 'Prevenu', label: 'Prévenu' },
    { value: 'Condamne', label: 'Condamné' },
    { value: 'Representant legal', label: 'Représentant légal' },
    { value: 'Autre', label: 'Autre' }
  ];

  proceduresOptions = [
    { value: 'Plainte depose', label: 'Plainte déposée' },
    { value: 'Enquete', label: 'Enquête en cours' },
    { value: 'Instruction judiciaire', label: 'Instruction Judiciaire' },
    { value: 'Audience programme', label: 'Audience programmée' },
    { value: 'Jugement rendu', label: 'Jugement rendu' },
    { value: 'Appel en cours', label: 'Appel en cours' },
    { value: 'Classement sans suite', label: 'Classement sans suite' },
    { value: 'Mediation', label: 'Médiation' },
    { value: 'Autre', label: 'Autre' }
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
    this.justiceForm = this.fb.group({
      nomComplet: ['', [Validators.required, Validators.minLength(3)]],
      genre: ['', Validators.required],
      email: ['', [Validators.email]],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      typeViolence: ['', Validators.required],
      roleAffaire: [''],
      affaireEnCause: [''],
      procedures: [''],
      numeroCarteIdentite: ['', [Validators.required, Validators.pattern(/^CNI[0-9]{10}$/)]],
      commentaire: ['']
    });
  }

  onPhotoSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedPhoto = file;
      const reader = new FileReader();
      reader.onload = () => this.photoPreview = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  onCartePhotoSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedCartePhoto = file;
      const reader = new FileReader();
      reader.onload = () => this.cartePhotoPreview = reader.result as string;
      reader.readAsDataURL(file);
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
    if (this.justiceForm.invalid) {
      this.justiceForm.markAllAsTouched();
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    try {
      const formValue = this.justiceForm.value;

      let photoBase64 = null;
      let cartePhotoBase64 = null;

      if (this.selectedPhoto) {
        photoBase64 = await this.fileToBase64(this.selectedPhoto);
      }
      if (this.selectedCartePhoto) {
        cartePhotoBase64 = await this.fileToBase64(this.selectedCartePhoto);
      }

      const justiceData = {
        ...formValue,
        source: 'justice',
        photo: photoBase64,
        photoCarteIdentite: cartePhotoBase64
      };

      this.storage.create(justiceData);

      this.isLoading = false;
      this.successMessage = ' Formulaire enregistré avec succès !';
      this.resetForm();

      setTimeout(() => this.successMessage = '', 5000);
    } catch (error) {
      this.isLoading = false;
      this.errorMessage = 'Erreur lors de l\'enregistrement';
      setTimeout(() => this.errorMessage = '', 5000);
    }
  }

  resetForm(): void {
    this.justiceForm.reset();
    this.selectedPhoto = null;
    this.selectedCartePhoto = null;
    this.photoPreview = null;
    this.cartePhotoPreview = null;

    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => (input as HTMLInputElement).value = '');
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
  get nomComplet() { return this.justiceForm.get('nomComplet'); }
  get email() { return this.justiceForm.get('email'); }
  get contact() { return this.justiceForm.get('contact'); }
  get numeroCarteIdentite() { return this.justiceForm.get('numeroCarteIdentite'); }
}
