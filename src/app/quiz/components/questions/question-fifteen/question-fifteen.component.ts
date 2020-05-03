import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { QuizModel } from '../../../../core/models/quiz.model';

@Component({
  selector: 'app-question-fifteen',
  templateUrl: './question-fifteen.component.html',
  styleUrls: ['./question-fifteen.component.scss']
})
export class QuestionFifteenComponent implements OnInit {
  @Input('question') questionItem: QuizModel;
  @Output() submitted: EventEmitter<any> = new EventEmitter<any>();

  public currentId: number;
  public options: string[];
  public answer: string | boolean;
  public questionForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.currentId = this.questionItem.id;
    this.options = this.questionItem.question[0].options;
    this.answer = this.questionItem.question[0].answer;
    this.questionForm = new FormGroup({
      option: new FormControl(this.answer, Validators.required)
    });
  }

  public onSubmit() {
    const data = {
      answer: this.questionForm.value.option
    };
    this.submitted.emit(data);
    this.questionForm.reset();
  }
}
