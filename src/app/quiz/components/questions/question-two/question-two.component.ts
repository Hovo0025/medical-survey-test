import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { QuizModel } from '../../../../core/models/quiz.model';

@Component({
  selector: 'app-question-two',
  templateUrl: './question-two.component.html',
  styleUrls: ['./question-two.component.scss']
})
export class QuestionTwoComponent implements OnInit {
  @Input('question') questionItem: QuizModel;
  @Output() submitted: EventEmitter<any> = new EventEmitter<any>();

  public questionForm: FormGroup;
  public answer: object;

  public questionListLength: number;
  public height: number;
  public weight: number;
  public bmi: number;

  constructor() { }

  ngOnInit() {
    this.height = this.questionItem.question[0].answer.height;
    this.weight = this.questionItem.question[0].answer.weight;
    this.bmi = this.questionItem.question[0].answer.bmi;

    this.questionForm = new FormGroup({
      height: new FormControl(this.height, Validators.required),
      weight: new FormControl(this.weight, Validators.required)
    });
  }

  public onSubmit() {
    this.height = this.questionForm.value.height;
    this.weight = this.questionForm.value.weight;
    this.bmi = this.calculateBmi();

    this.answer = {
      height: this.height,
      weight: this.weight,
      bmi: this.bmi,
    };
  }

  public onNavigateNext() {
    this.onSubmit();
    const data = {
      answer: this.answer
    };
    this.submitted.emit(data);
    this.questionForm.reset();
  }

  public calculateBmi() {
    const finalBmi = this.weight / (this.height / 100 * this.height / 100);
    return Math.round(finalBmi * 10) / 10;
  }
}
