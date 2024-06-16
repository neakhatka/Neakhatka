export interface postcreateschema {
  companyName?: string;
  workplace?: string;
  position?: string;
  location?: string;
  jobDescription?: string[];
  jobResponsibilities?: string[];
  startDate?: string;
  endDate?: string;
  salary?: number[];
  totalEmployees?: number;
  time?: "full-time" | "part-time";
  duration?: string;
  availablePositions?: number;
  gender?: string;
}

export interface postupdateschema {
  companyName?: string;
  workplace?: string;
  position?: string;
  location?: string;
  jobDescription?: string[];
  jobResponsibilities?: string[];
  startDate?: string;
  endDate?: string;
  salary?: number[];
  totalEmployees?: number;
  time?: "full-time" | "part-time";
  duration?: string;
  availablePositions?: number;
  gender?: string;
}
