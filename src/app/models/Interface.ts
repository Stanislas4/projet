export interface Justice {
  id?: string;
  nomComplet: string;
  genre: string;
  email: string;
  contact: string;
  typeViolence: string;
  roleAffaire: string;
  affaireEnCause?: string;
  photo?: string; // Base64
  photoCarteIdentite?: string; // Base64
  numeroCarteIdentite: string;
  commentaire?: string;
  createdAt?: string;
  updatedAt?: string;
  source?: 'justice';
}

export interface OSC {
  id?: string;
  nomComplet: string;
  commentaire: string;
  etapeParcours?: string;
  organisationRespo?: string;
  typeViolence: string;
  dossierAdministratif?: string; // Base64
  createdAt?: string;
  updatedAt?: string;
  source?: 'osc';
}

export interface Police {
  id?: string;
  nomComplet: string;
  domicile: string;
  statutJudiciaire?: string;
  contact: string;
  typeViolence: string;
  dateDebutProcedure: string;
  auteur?: string;
  commentaire?: string;
  agentRecepteur: string;
  photoCarteIdentite?: string; // Base64
  numeroCarteIdentite?: string;
  createdAt?: string;
  updatedAt?: string;
  source?: 'police';
}

export interface Sante {
  id?: string;
  nomComplet: string;
  sexe: string;
  age: number;
  cessionnaire?: string;
  dateAgression: string;
  pieceJointe?: string; // Base64
  contact: string;
  lesionConstates?: string;
  medicamentDonnes?: string;
  examenFait?: string;
  structureRespo?: string;
  hospitalisation?: string;
  etapeDossier?: string;
  typeViolence: string;
  pepVih?: string;
  commentaire?: string;
  createdAt?: string;
  updatedAt?: string;
  source?: 'sante';
}
