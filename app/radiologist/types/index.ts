// Type definitions for our data structure
export interface Instance {
  content_date: string;
  content_time: string;
  created_at: string;
  dicom_file: string;
  instance_number: number;
  series: string;
  sop_class_uid: string;
  sop_instance_uid: string;
  transfer_syntax_uid: string;
  updated_at: string;
}

export interface Series {
  id: string;
  body_part_examined: string;
  created_at: string;
  description: string;
  instances: Instance[];
  number_of_instances: number;
  series_number: number;
  study: string;
}

export interface Study {
  accession_number: string;
  created_at: string;
  description: string;
  hospital: number;
  id: string;
  modality: string;
  notes: string;
  patient: string;
  priority: string;
  referring_physician: string;
  series: Series[];
  status: string;
  study_date: string;
  updated_at: string;
  patient_detail?: Patient;
  hospital_detail?: Hospital;
}

export interface Hospital {
  active: boolean;
  code: string;
  id: number;
  local_ae_title: string;
  name: string;
  pacs_ae_title: string;
  pacs_host: string;
  pacs_port: number;
  patients_count: number;
  studies_count: number;
}

export interface Patient {
  age: number;
  created_at: string;
  date_of_birth: string;
  external_hospital_id: string;
  full_name: string;
  gender: string;
  hospital: number;
  hospital_detail?: Hospital;
  id: string;
  medical_record_number: string;
  patient_id: string;
  updated_at: string;
}

export interface Stats {
  hospitals: number;
  patients: number;
  studies: number;
  series: number;
  instances: number;
}

export interface SelectedItem {
  id: string | number;
  type: "hospital" | "patient" | "study" | "series" | "instance";
}

export interface TreeNodeProps {
  label: string;
  id: string | number;
  type: string;
  isOpen: boolean;
  onToggle: (id: string | number) => void;
  onSelect: (item: SelectedItem) => void;
  isSelected: boolean;
  count: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}
