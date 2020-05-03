import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

import { SubjectsService } from '../../../core/services/subjects.service';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {
  public activePart: number;

  constructor(private activatedRoute: ActivatedRoute,
              private subjectsService: SubjectsService) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: Data) => {
      this.activePart = data.activePart;
    });

    this.subjectsService.questionPosition$.next({position: 0, activeStep: this.activePart});
  }
}
