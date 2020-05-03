import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { QuizService } from '../../../core/services/quiz.service';
import { SubjectsService } from '../../../core/services/subjects.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit, OnDestroy {
  public parts: {partIndex: number, name: string, child: number}[] = [];
  public currentQuestionPosition = 0;
  public activePart = 0;
  private destroySubject$: Subject<void> = new Subject();

  constructor(private quizService: QuizService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private subjectsService: SubjectsService) { }

  ngOnInit() {
    this.subjectsService.readyToLoad$
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((load: boolean) => {
        if (load) {
          this.initProgressBar();
        }
      });

    this.subjectsService.questionPosition$
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((data: { position: number, activeStep: number }) => {
        this.currentQuestionPosition = data.position;
        this.activePart = data.activeStep;
      });
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
  }

  public getProgressPosition(partIndex: number, partQuestionsCount, flag = false) {
    if (this.activePart > partIndex) {
      return  '100%';
    }
    let result = 0;
    if (this.activePart === partIndex) {
      const coefficient = partQuestionsCount / this.currentQuestionPosition;
      result = 100 / coefficient;
    }
    return result + '%';
  }

  public initProgressBar() {
    for (let i = 0; i < this.quizService.questionList.length; i++) {
      const part = {
        partIndex: i,
        name: (i === this.quizService.questionList.length - 1) ? `Submit` : `Part ${i + 1}`,
        child: this.quizService.questionList[i].questions.length };
      this.parts.push(part);
    }
  }

  public onNextDisabled() {
    const currentPart = this.parts[this.activePart];
    const part = this.activePart + 1;
    const allPartsLength = this.parts.length;
    return part === allPartsLength && this.currentQuestionPosition === currentPart.child;
  }

  public onPrevDisabled() {
    if (this.parts.length) {
      const currentPart = this.parts[this.activePart];
      if (currentPart.partIndex === 0 && this.currentQuestionPosition === 0) {
        return true;
      }
    }
  }

  public onNext(next = false) {
    const part = this.activePart + 1;
    const currentPart = this.parts[this.activePart];
    const activePart = `part-${part}`;
    let questionId = this.currentQuestionPosition;

    if (next) {
      questionId = questionId + 1;
      if (this.currentQuestionPosition === currentPart.child) {
        this.router.navigate([`/quiz/part-${this.parts[part].partIndex + 1}`], {relativeTo: this.activatedRoute});
        return;
      }
    }
    if (!next) {
      questionId = questionId - 1;
      if (this.currentQuestionPosition === 1) {
        if (currentPart.partIndex === 0) {
          this.router.navigate([`/quiz/part-1`], {relativeTo: this.activatedRoute});
          return;
        }
        this.router.navigate([`/quiz/part-${this.activePart}`, this.parts[this.activePart - 1].child], {relativeTo: this.activatedRoute});
        return;
      }
    }
    this.router.navigate([`/quiz/${activePart}`, questionId], {relativeTo: this.activatedRoute});
  }
}
