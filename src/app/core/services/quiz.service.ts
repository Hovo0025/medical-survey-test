import { Injectable } from '@angular/core';

import questions from '../../_files/questions.json';
import { CacheService } from './cache.service';
import { LocalStorageService } from './local-storage.service';
import { LocalStorageConstants } from '../constants/local-storage.constants';
import { SubjectsService } from './subjects.service';
import { QuizModel } from '../models/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  public questionList: any;
  public userEmail: string;

  constructor(private cacheService: CacheService,
              private subjectsService: SubjectsService) {
    this.getData();
  }

  public getQuestion(part: number, id: number) {
    return this.questionList[part].questions.find(el => el.id === id);
  }

  public saveAnswer(part: number, id: number, answer: any, flag = false) {
    console.log('Saved!');
    const index = this.questionList[part].questions.findIndex(el => el.id === id);

    if (flag) {
      this.questionList[part].questions[index].question[0].answer = answer;
      this.saveData();
      return;
    }
    if (Array.isArray(answer)) {
      for (let i = 0; i < answer.length; i++) {
        this.questionList[part].questions[index].question[i].answer = answer[i];
      }
    } else {
      this.questionList[part].questions[index].question[0].answer = answer;
    }
    this.saveData();
  }

  public getData() {
    this.userEmail = LocalStorageService.getData(LocalStorageConstants.email);
    this.cacheService.get(this.userEmail).subscribe((data: QuizModel) => {
      if (data) {
        this.questionList = data;
        this.subjectsService.readyToLoad$.next(true);
      } else {
        this.cacheService.set(this.userEmail, questions).subscribe((set: boolean) => {
          if (set) {
            this.cacheService.get(this.userEmail).subscribe((questionList: QuizModel) => {
              this.questionList = questionList;
              this.subjectsService.readyToLoad$.next(true);
            });
          }
        });
      }
    });
  }

  public saveData() {
    this.cacheService.set(this.userEmail, this.questionList);
  }
}
