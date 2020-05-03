import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { QuizModel } from '../../../../core/models/quiz.model';

@Component({
  selector: 'app-question-one',
  templateUrl: './question-one.component.html',
  styleUrls: ['./question-one.component.scss']
})
export class QuestionOneComponent implements OnInit {
  @Input('question') questionItem: QuizModel;
  @Input() part: number;
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
      options: new FormArray([]),
    });
    for (let i = 0; i < this.questionItem.question.length; i++) {
      const control = new FormControl(this.questionItem.question[i].answer);
      (this.questionForm.get('options') as FormArray).push(control);
    }
  }

  public onSubmit() {
    const data = {
      answer: this.questionForm.value.options,
    };
    this.submitted.emit(data);
  }

  public getImgPath(part, id) {
    const currentPart = part + 1;
    return `/assets/images/${currentPart}-${id}/0.png`;
  }
}
