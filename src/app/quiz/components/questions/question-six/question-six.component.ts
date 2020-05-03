import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-question-six',
  templateUrl: './question-six.component.html',
  styleUrls: ['./question-six.component.scss']
})
export class QuestionSixComponent implements OnInit {
  @Input('question') questionItem: any;
  @Output() submitted: EventEmitter<any> = new EventEmitter<any>();

  public questionOptions: string[] = [];
  public questionAnswers: boolean[] = [];
  public currentId: number;
  public answer = [];

  constructor() { }

  ngOnInit() {
    this.questionOptions = this.questionItem.question[0].options;
    this.questionAnswers = this.questionItem.question[0].answer;
    this.currentId = this.questionItem.id;

    for (let i = 0; i < this.questionItem.question.length; i++) {
      this.answer.push(this.questionItem.question[i].answer);
    }
  }

  public onSubmit() {
    const data = {
      answer: this.answer
    };
    this.submitted.emit(data);
  }

  public onChange(e, mainIndex, index) {
    this.answer[mainIndex][index] = e.target.checked;
  }

  public getFor(i, j) {
    return `${i}-${j}`;
  }
}
