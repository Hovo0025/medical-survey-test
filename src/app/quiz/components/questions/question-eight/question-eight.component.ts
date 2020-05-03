import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { QuizModel } from '../../../../core/models/quiz.model';

@Component({
  selector: 'app-question-eight',
  templateUrl: './question-eight.component.html',
  styleUrls: ['./question-eight.component.scss']
})
export class QuestionEightComponent implements OnInit {
  @Input('question') questionItem: QuizModel;
  @Output() submitted: EventEmitter<any> = new EventEmitter<any>();

  public questionForm: FormGroup;
  public currentId: number;

  constructor() { }

  ngOnInit() {
    this.currentId = this.questionItem.id;
    this.questionForm = new FormGroup({
      radioOption: new FormControl(this.questionItem.question[0].answer)
    });
  }

  public onSubmit() {
    const data = {
      answer: this.questionForm.value.radioOption
    };
    this.submitted.emit(data);
    this.questionForm.reset();
  }

  public getImagePath(i) {
    return `/assets/images/${this.currentId}/${i}.png`;
  }
}
