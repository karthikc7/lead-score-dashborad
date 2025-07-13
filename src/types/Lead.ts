export interface Lead {
  id: string;
  email: string;
  phoneNumber: string;
  creditScore: number;
  ageGroup: string;
  familyBackground: string;
  income: number;
  employmentStatus: string;
  comments: string;
  initialScore: number;
  rerankedScore: number;
  timestamp: string;
  consent: boolean;
}