import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageService } from '../../Service/storage';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-police-forms',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './police-forms.component.html',
  styleUrl: './police-forms.component.css'
})
export class PoliceFormsComponent {
  policeForm!: FormGroup;
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

    statutJudiciaireOptions = [
      { value: 'Plainte', label: 'Plainte enregistrée' },
      { value: 'Enquete en cours', label: 'Enquête en cours' },
      { value: 'Transmis au parquet', label: 'Transmis au parquet' },
      { value: 'En instruction', label: 'En instruction' },
      { value: 'Classe sans suite', label: 'Classé sans suite' },
      { value: 'Jugement ou cloture', label: 'En jugement ou clôturé' }
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
      this.policeForm = this.fb.group({
        nomComplet: ['', [Validators.required, Validators.minLength(2)]],
        domicile: ['', Validators.required],
        contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        typeViolence: ['', Validators.required],
        dateDebutProcedure: ['', Validators.required],
        statutJudiciaire: [''],
        auteur: [''],
        commentaire: [''],
        agentRecepteur: ['', Validators.required],
        numeroCarteIdentite: ['', [Validators.pattern(/^CNI[0-9]{10}$/)]]
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
      if (this.policeForm.invalid) {
        this.policeForm.markAllAsTouched();
        this.errorMessage = 'Veuillez remplir tous les champs obligatoires';
        return;
      }
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      try {
        const formValue = this.policeForm.value;

        let photoBase64 = null;
        if (this.selectedFile) {
          photoBase64 = await this.fileToBase64(this.selectedFile);
        }

        const policeData = {
          ...formValue,
          source: 'police',
          dateDebutProcedure: new Date(formValue.dateDebutProcedure).toISOString(),
          photoCarteIdentite: photoBase64
        };

        this.storage.create(policeData);
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
      this.policeForm.reset();
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
    get nomComplet() { return this.policeForm.get('nomComplet'); }
    get contact() { return this.policeForm.get('contact'); }
    get typeViolence() { return this.policeForm.get('typeViolence'); }
}
