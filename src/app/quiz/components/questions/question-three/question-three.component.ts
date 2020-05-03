import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { QuizModel } from '../../../../core/models/quiz.model';

@Component({
  selector: 'app-question-three',
  templateUrl: './question-three.component.html',
  styleUrls: ['./question-three.component.scss'],
})
export class QuestionThreeComponent implements OnInit {
  @Input('question') questionItem: QuizModel;
  @Output() submitted: EventEmitter<any> = new EventEmitter<any>();

  public age: string;
  public gender: string;
  public ageOpened = false;
  public genderOpened = false;

  constructor() { }

  ngOnInit() {
    this.age = this.questionItem.question[0].answer;
    this.gender = this.questionItem.question[1].answer;
  }

  public onSubmit() {
    const answer = [this.age, this.gender];
    const data = {
      answer
    };
    this.submitted.emit(data);
  }

  public toggleOpened(flag = false) {
    if (flag) {
      this.genderOpened = !this.genderOpened;
      return;
    }
    this.ageOpened = !this.ageOpened;
  }

  public onSelect(data: string, flag = false) {
    if (flag) {
      this.gender = data;
      return;
    }
    this.age = data;
  }

}
