import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { QuizModel } from '../../../../core/models/quiz.model';

@Component({
  selector: 'app-question-four',
  templateUrl: './question-four.component.html',
  styleUrls: ['./question-four.component.scss']
})
export class QuestionFourComponent implements OnInit {
  @Input('question') questionItem: QuizModel;
  @Output() submitted: EventEmitter<any> = new EventEmitter<any>();

  public questionForm: FormGroup;
  public country: string;
  public newCountry = '';

  constructor() { }

  ngOnInit() {
    this.country = this.questionItem.question[0].answer;
    // @ts-ignore
    if (this.questionItem.question[0].options.indexOf(this.country) === -1) {
      this.newCountry = this.country;
    }

    this.questionForm = new FormGroup({
      country: new FormControl(this.country)
    });
  }

  public onSubmit() {
    const data = {
      answer: this.questionForm.value.country || this.newCountry
    };
    this.submitted.next(data);
  }

  public addNewCountry(e) {
    this.newCountry = e.target.value;
    this.questionForm.reset();
  }

  public onChange() {
    this.newCountry = null;
  }
}

