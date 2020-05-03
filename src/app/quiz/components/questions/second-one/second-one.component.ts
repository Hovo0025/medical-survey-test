import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuizModel } from '../../../../core/models/quiz.model';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-second-one',
  templateUrl: './second-one.component.html',
  styleUrls: ['./second-one.component.scss']
})
export class SecondOneComponent implements OnInit {
  @Input('question') questionItem: QuizModel;
  @Input() part = 1;
  @Input() smallRadio = false;
  @Input() unique = false;
  @Output() submitted: EventEmitter<any> = new EventEmitter<any>();

  public currentId: number;
  public options: string[];
  public answer: string | boolean;
  public form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      options: new FormArray([]),
    });
    this.currentId = this.questionItem.id;
    this.options = this.questionItem.question[0].options;
    this.answer = this.questionItem.question[0].answer;
    for (let i = 0; i < this.questionItem.question.length; i++) {
      const control = new FormControl(this.questionItem.question[i].answer);
      (this.form.get('options') as FormArray).push(control);
    }
  }

  public onSubmit() {
    const data = {
      answer: this.form.value.options,
    };
    this.submitted.emit(data);
    this.form.reset();
  }

  public getImage(i) {
    const currentPart = this.part + 1;
    return `/assets/images/${currentPart}-${this.currentId}/${i}.png`;
  }
}
