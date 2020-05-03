import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { SubjectsService } from '../../../core/services/subjects.service';
import { QuizService } from '../../../core/services/quiz.service';
import { QuizModel } from '../../../core/models/quiz.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public questionItem: QuizModel;
  public currentId: number;
  public activePart: number;
  public questionListLength: number;
  public readyToLoad = false;
  private destroySubject$: Subject<void> = new Subject();

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private subjectsService: SubjectsService,
              private quizService: QuizService) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: { id: number, activePart: number }) => {
      this.currentId = data.id;
      this.activePart = data.activePart;
    });

    this.subjectsService.readyToLoad$
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((load: boolean) => {
        if (load) {
          this.loadData();
        }
      });
  }

  public loadData() {
    this.questionItem = this.quizService.getQuestion(this.activePart, this.currentId);
    this.questionListLength = this.quizService.questionList[this.activePart].questions.length;
    this.subjectsService.questionPosition$.next({position: this.currentId, activeStep: this.activePart});
    this.readyToLoad = true;
  }

  public onFormSubmit(data) {
    const flag = (data.flag) ? data.flag : false;
    this.quizService.saveAnswer(this.activePart , this.questionItem.id, data.answer, flag);

    if (this.currentId === this.questionListLength) {
      if (this.activePart + 1 === this.questionListLength - 1) {
        console.log('SUBMIT');
        return;
      }
      const nextPart = `../../part-${this.activePart + 2}`;
      this.router.navigate([nextPart], {relativeTo: this.activatedRoute});
    } else {
      this.router.navigate(['../', ++this.currentId], {relativeTo: this.activatedRoute});
    }
  }
}
