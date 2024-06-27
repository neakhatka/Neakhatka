export interface postcreateschema {
  companyName?: string;
  workplace?: string;
  position?: string;
  location?: string;
  jobDescription?: string[];
  jobResponsibilities?: string[];
  startDate?: string;
  endDate?: string;
  salary?: string;
  totalEmployees?: string;
  time?: "full-time" | "part-time";
  duration?: string;
  availablePositions?: string;
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
  salary?: string;
  totalEmployees?: string;
  time?: "full-time" | "part-time";
  duration?: string;
  availablePositions?: string;
  gender?: string;
}
