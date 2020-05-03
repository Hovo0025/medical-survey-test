import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QuizModel} from "../../../../core/models/quiz.model";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-second-four',
  templateUrl: './second-four.component.html',
  styleUrls: ['./second-four.component.scss']
})
export class SecondFourComponent implements OnInit {
  @Input('question') questionItem: QuizModel;
  @Output() submitted: EventEmitter<any> = new EventEmitter<any>();

  public currentId: number;
  public options: string[];
  public answer: string | boolean;
  public form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
