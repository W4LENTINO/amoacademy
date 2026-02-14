export enum UserRole {
  ALUNO = 'ALUNO',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
  EDITOR = 'EDITOR',
  VIEWER = 'VIEWER'
}

export interface User {
  id: string;
  name: string;
  email: string;
  bi: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  profession?: string;
  lastAccess?: string;
  status: 'active' | 'inactive' | 'blocked';
}

export interface Course {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  instructor: string;
  startDate: string;
  endDate: string;
  image: string;
  status: 'active' | 'inactive';
  learningOutcomes: string[];
  category: string;
  hours: number;
}

export interface Certificate {
  id: string;
  userId: string;
  userName: string;
  courseId: string;
  courseName: string;
  issueDate: string;
  verificationCode: string;
  hash: string;
  hours: number;
  status: 'VALID' | 'INVALID';
}

export interface Enrollment {
  id: string;
  date: string;
  studentName: string;
  studentEmail: string;
  courseName: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface AdminNotification {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  message: string;
  timestamp: string;
  read: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  image: string;
  category: string;
  date: string;
  content?: string;
  author?: string;
  tags?: string[];
  status?: 'published' | 'draft' | 'archived';
  featured?: boolean;
  views?: number;
  slug?: string;
  publishDate?: string;
}