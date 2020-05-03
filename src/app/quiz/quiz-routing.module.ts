import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuizComponent } from './components/root/quiz.component';
import { IntroductionComponent } from './components/introduction/introduction.component';
import { MainComponent } from './components/main/main.component';
import { QuestionsComponent } from './components/questions/questions.component';

const routes: Routes = [
  {
    path: '',
    component: QuizComponent,
    children: [
      {
        path: 'part-1',
        component: QuestionsComponent,
        children: [
          {
            path: '',
            component: IntroductionComponent,
            data: { activePart: 0 }
          },
          {
            path: '1',
            component: MainComponent,
            data: { id: 1, activePart: 0 }
          },
          {
            path: '2',
            component: MainComponent,
            data: { id: 2, activePart: 0 }
          },
          {
            path: '3',
            component: MainComponent,
            data: { id: 3, activePart: 0 }
          },
          {
            path: '4',
            component: MainComponent,
            data: { id: 4, activePart: 0 }
          },
          {
            path: '5',
            component: MainComponent,
            data: { id: 5, activePart: 0 }
          },
          {
            path: '6',
            component: MainComponent,
            data: { id: 6, activePart: 0 }
          },
          {
            path: '7',
            component: MainComponent,
            data: { id: 7, activePart: 0 }
          },
          {
            path: '8',
            component: MainComponent,
            data: { id: 8, activePart: 0 }
          },
          {
            path: '9',
            component: MainComponent,
            data: { id: 9, activePart: 0 }
          },
          {
            path: '10',
            component: MainComponent,
            data: { id: 10, activePart: 0 }
          },
          {
            path: '11',
            component: MainComponent,
            data: { id: 11, activePart: 0 }
          },
          {
            path: '12',
            component: MainComponent,
            data: { id: 12, activePart: 0 }
          },
          {
            path: '13',
            component: MainComponent,
            data: { id: 13, activePart: 0 }
          },
          {
            path: '14',
            component: MainComponent,
            data: { id: 14, activePart: 0 }
          },
          {
            path: '15',
            component: MainComponent,
            data: { id: 15, activePart: 0 }
          },
          {
            path: '16',
            component: MainComponent,
            data: { id: 16, activePart: 0 }
          }
        ]
      },
      {
        path: 'part-2',
        component: QuestionsComponent,
        children: [
          {
            path: '',
            component: IntroductionComponent,
            data: { activePart: 1 }
          },
          {
            path: '1',
            component: MainComponent,
            data: { id: 1, activePart: 1 }
          },
          {
            path: '2',
            component: MainComponent,
            data: { id: 2, activePart: 1 }
          },
          {
            path: '3',
            component: MainComponent,
            data: { id: 3, activePart: 1 }
          },
          {
            path: '4',
            component: MainComponent,
            data: { id: 4, activePart: 1 }
          },
          {
            path: '5',
            component: MainComponent,
            data: { id: 5, activePart: 1 }
          },
          {
            path: '6',
            component: MainComponent,
            data: { id: 6, activePart: 1 }
          },
          {
            path: '7',
            component: MainComponent,
            data: { id: 7, activePart: 1 }
          },
          {
            path: '8',
            component: MainComponent,
            data: { id: 8, activePart: 1 }
          },
          {
            path: '9',
            component: MainComponent,
            data: { id: 9, activePart: 1 }
          },
          {
            path: '10',
            component: MainComponent,
            data: { id: 10, activePart: 1 }
          }
        ]
      },
      {
        path: 'part-3',
        component: QuestionsComponent,
        children: [
          {
            path: '',
            component: IntroductionComponent,
            data: {activePart: 2}
          },
          {
            path: '1',
            component: MainComponent,
            data: { id: 1, activePart: 2 }
          },
          {
            path: '2',
            component: MainComponent,
            data: { id: 2, activePart: 2 }
          },
          {
            path: '3',
            component: MainComponent,
            data: { id: 3, activePart: 2 }
          },
          {
            path: '4',
            component: MainComponent,
            data: { id: 4, activePart: 2 }
          },
        ]
      },
      {
        path: '**',
        redirectTo: 'part-1'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule {
}
