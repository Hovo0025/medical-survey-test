import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { QuizModel } from '../../../../core/models/quiz.model';

@Component({
  selector: 'app-question-five',
  templateUrl: './question-five.component.html',
  styleUrls: ['./question-five.component.scss']
})
export class QuestionFiveComponent implements OnInit {
  @Input('question') questionItem: QuizModel;
  @Input() part = 0;
  @Output() submitted: EventEmitter<any> = new EventEmitter<any>();

  public questionOptions: string[] = [];
  public questionForLoop: string[] = [];
  public questionAnswers: boolean[] = [];
  public lastItemValue: string;
  public lastItemChecked = false;
  public questionForm: FormGroup;
  public currentId: number;

  constructor() { }

  ngOnInit() {
    this.questionOptions = this.questionItem.question[0].options;
    this.questionForLoop = this.questionOptions.slice(0, this.questionOptions.length - 1);
    this.questionAnswers = this.questionItem.question[0].answer;
    this.lastItemValue = this.questionOptions[this.questionOptions.length - 1];
    this.lastItemChecked = this.questionAnswers[this.questionAnswers.length - 1];
    this.currentId = this.questionItem.id;

    this.questionForm = new FormGroup({
      options: new FormArray([]),
      itemControl: new FormControl(this.lastItemChecked)
    });

    this.questionItem.question[0].answer.filter((el: boolean) => {
      const control = new FormControl(el);
      (this.questionForm.get('options') as FormArray).push(control);
    });
  }

  public onSubmit() {
    const answer = this.questionForm.value.options;
    const lastOption = this.questionForm.value.itemControl;

    for (let i = 0; i < answer.length; i++) {
      if (answer[i] === null || lastOption) {
        answer[i] = false;
      }
    }

    answer[answer.length - 1] = !!lastOption;
    const data = {
      answer,
      flag: true
    };
    this.submitted.emit(data);
    this.questionForm.reset();
  }

  public getImagePath(i) {
    if (this.part === 2) {
      return `/assets/images/3-${this.part + 1}/${i}.png`;
    }
    return `/assets/images/${this.currentId}/${i}.png`;
  }

  public onSelectLastItem(e) {
    if (e.target.checked) {
      this.questionForm.get('options').reset();
    }
  }

  public changeLastItem() {
    this.questionForm.get('itemControl').setValue(false);
  }
}
