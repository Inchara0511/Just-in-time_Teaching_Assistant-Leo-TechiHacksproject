//import { User, Remark, Feedback } from '@/types';
import { User, Remark, Feedback } from '../types';


const STORAGE_KEYS = {
  CURRENT_USER: 'jit_current_user',
  REMARKS: 'jit_remarks',
  FEEDBACK: 'jit_feedback',
  AI_HISTORY: 'jit_ai_history',
};

export const storage = {
  // User
  getCurrentUser: (): User | null => {
    const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  },
  
  setCurrentUser: (user: User | null) => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  },
  
  // Remarks
  getRemarks: (): Remark[] => {
    const remarks = localStorage.getItem(STORAGE_KEYS.REMARKS);
    return remarks ? JSON.parse(remarks) : [];
  },
  
  addRemark: (remark: Remark) => {
    const remarks = storage.getRemarks();
    remarks.push(remark);
    localStorage.setItem(STORAGE_KEYS.REMARKS, JSON.stringify(remarks));
  },
  
  // Feedback
  getFeedback: (): Feedback[] => {
    const feedback = localStorage.getItem(STORAGE_KEYS.FEEDBACK);
    return feedback ? JSON.parse(feedback) : [];
  },
  
  addFeedback: (feedback: Feedback) => {
    const allFeedback = storage.getFeedback();
    allFeedback.push(feedback);
    localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(allFeedback));
  },
  
  // AI History
  getAIHistory: (): Array<{ question: string; answer: string; timestamp: string }> => {
    const history = localStorage.getItem(STORAGE_KEYS.AI_HISTORY);
    return history ? JSON.parse(history) : [];
  },
  
  addAIHistory: (item: { question: string; answer: string; timestamp: string }) => {
    const history = storage.getAIHistory();
    history.unshift(item); // Add to beginning
    // Keep only last 50 items
    if (history.length > 50) {
      history.splice(50);
    }
    localStorage.setItem(STORAGE_KEYS.AI_HISTORY, JSON.stringify(history));
  },
  
  clearAll: () => {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  },
};
