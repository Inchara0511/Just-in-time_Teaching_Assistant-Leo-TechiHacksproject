export type UserRole = 'teacher' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  subject?: string;
  grade?: string;
}

export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  grade: string;
  section: string;
}

export interface Remark {
  id: string;
  studentId: string;
  teacherId: string;
  teacherName: string;
  text: string;
  date: string;
  subject?: string;
}

export interface Feedback {
  id: string;
  teacherId: string;
  adminId: string;
  adminName: string;
  text: string;
  date: string;
  type: 'praise' | 'suggestion' | 'concern';
}

export interface Class {
  id: string;
  grade: string;
  section: string;
  subject: string;
  students: Student[];
}

export interface Chapter {
  id: string;
  subject: string;
  grade: string;
  title: string;
  summary: string;
  keyPoints: string[];
  activities: string[];
}

export interface AIResponse {
  question: string;
  answer: string;
  timestamp: string;
}
