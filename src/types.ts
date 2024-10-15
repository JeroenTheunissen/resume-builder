export interface PersonalDetails {
  professionalTitle: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  linkedinHandle: string;
  city: string;
}

export interface WorkExperience {
  company: string;
  position: string;
  startDate: Date | null;
  endDate?: Date | null; // Optional
  description: string;
}

export interface Education {
  institution: string;
  startDate: Date | null;
  endDate?: Date | null; // Optional
  description?: string;
}

export interface Skill {
  name: string;
}

export interface Certificate {
  name: string;
}

export type LanguageProficiency = 'Native' | 'Full Professional' | 'Professional' | 'Limited' | 'Basic';

export interface Language {
  name: string;
  proficiency: LanguageProficiency;
}

export interface ResumeData {
  personalDetails: PersonalDetails;
  summary: string;
  workExperience: WorkExperience[];
  education: Education[];
  certificates: Certificate[];
  skills: Skill[];
  languages: Language[];
}
