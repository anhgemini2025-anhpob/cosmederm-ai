export type UserRole = "consumer" | "student" | "professional";

export interface RoleInfo {
  id: UserRole;
  title: string;
  subtitle: string;
  description: string;
  emoji: string;
  href: string;
}

export interface Ingredient {
  id: string;
  inci_name: string;
  chemical_class_function: string;
  cir_safety_status: string;
  max_concentration: {
    leave_on: string;
    rinse_off: string;
  };
  ph_range: string;
  toxicology_notes: string;
  applications: string[];
  book_sources: string[];
}

export interface CirDatabase {
  system_metadata: Record<string, string>;
  ingredients: Ingredient[];
}

export interface FormulationIngredient {
  inci_name: string;
  percentage: number | string;
  function: string;
}

export interface FormulationPhase {
  phase_name: string;
  ingredients: FormulationIngredient[];
}

export interface Formulation {
  formula_id: string;
  title: string;
  target_category: string;
  sensory_feel_description: string;
  phases: FormulationPhase[];
  specifications: {
    ph_range: string;
    viscosity_cps: string;
    appearance: string;
  };
  manufacturing_instructions: string[];
  formulation_know_how: string;
  book_sources: string[];
}

export interface FormulationDatabase {
  system_metadata: Record<string, string>;
  formulations: Formulation[];
}

export interface FormulationCatalogEntry {
  id: string;
  name: string;
  nameVi: string;
  functionVi: string;
  brand: string;
  brandLabel: string;
  formulaNo?: string;
  categories: string[];
  keyIngredients: string[];
}

export interface FormulationCatalogDatabase {
  system_metadata: { total: number; sources: string[]; note: string };
  formulations: FormulationCatalogEntry[];
}

export interface ClinicalProcedure {
  procedure_type: string;
  dosage_or_parameters: string;
  technique_and_depth: string;
  precautions_and_contraindications: string;
}

export interface TopicalRegimenItem {
  active: string;
  schedule: string;
}

export interface ClinicalCase {
  case_id: string;
  condition_name: string;
  patient_profile: {
    age_range: string;
    fitzpatrick_skin_type: string;
    glogau_classification: string;
    primary_complaints: string;
  };
  topical_regimen: TopicalRegimenItem[];
  clinical_procedures: ClinicalProcedure[];
  combined_therapy_synergy: string;
  book_sources: string[];
}

export interface ClinicalDatabase {
  system_metadata: Record<string, string>;
  clinical_cases: ClinicalCase[];
}

export type GlogauLevel = "I" | "II" | "III" | "IV";
