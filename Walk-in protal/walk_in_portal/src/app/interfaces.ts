export interface IUserData {
  id: number;
  first_name: string;
  last_name: string;
  token: string;
}

export interface IRole {
  id: number;
  name: string;
}

export interface ICollege {
  id: number;
  name: string;
}

export interface IStream {
  id: number;
  name: string;
}

export interface IQualification {
  id: number;
  name: string;
}

export interface ITechnology {
  id: number;
  name: string;
}

export interface IApplicantType {
  id: number;
  name: string;
}

export interface IWalkIns {
  id: number;
  title: string;
  start_date: Date;
  end_date: Date;
  jobRoles: IRole[];
  expiresIn?: number;
  location: string;
  is_internship_opportunity_for_mca_students: boolean;
}

export interface ITimeSlot {
  id: number;
  timeSlotStart: Date;
  timeSlotEnd: Date;
}

export interface IRoleWithDescription {
  id: number;
  name: string;
  grossCompensationPackage: string;
  requirements: string;
  roleDescription: string;
}

export interface IWalkInDetails {
  id: number;
  title: string;
  start_date: Date;
  end_date: Date;
  jobRoles: IRoleWithDescription[];
  expiresIn?: number;
  location: string;
  is_internship_opportunity_for_mca_students: boolean;
  venue_of_walk_in: string;
  timeSlots: ITimeSlot[];
  generalInstructions: string;
  instructionsForTheExam: string;
  minimumSystemRequirements: string;
  process: string;
}

export interface IJobApplicationDetails {
  date: Date;
  start_date: Date;
  time_slot_start: Date;
  time_slot_end: Date;
  venue_of_walk_in: string[];
  things_to_remember: string[];
}
