import { LocalStorageConstants } from '../constants/local-storage.constants';

export class LocalStorageService {
  constructor() {
  }

  static saveItem(key: string, data: any): void {
    localStorage.setItem(`${LocalStorageConstants.medicalSurvey}${key}`, data);
  }

  static getData(key: string): string {
    return localStorage.getItem(`${LocalStorageConstants.medicalSurvey}${key}`);
  }

  static clearAll(): void {
    localStorage.clear();
  }
}
