import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CacheService } from '../core/services/cache.service';
import { QuizRoutingModule } from './quiz-routing.module';
import { SharedModule } from '../shared/shared.module';
import { QuizComponent } from './components/root/quiz.component';
import { IntroductionComponent } from './components/introduction/introduction.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { QuestionOneComponent } from './components/questions/question-one/question-one.component';
import { QuestionTwoComponent } from './components/questions/question-two/question-two.component';
import { QuestionThreeComponent } from './components/questions/question-three/question-three.component';
import { QuestionFourComponent } from './components/questions/question-four/question-four.component';
import { QuestionFiveComponent } from './components/questions/question-five/question-five.component';
import { QuestionSixComponent } from './components/questions/question-six/question-six.component';
import { QuestionEightComponent } from './components/questions/question-eight/question-eight.component';
import { QuestionTenComponent } from './components/questions/question-ten/question-ten.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { GeneralInformationComponent } from './components/general-information/general-information.component';
import { QuestionElevenComponent } from './components/questions/questio-eleven/question-eleven.component';
import { QuestionTwelveComponent } from './components/questions/question-twelve/question-twelve.component';
import { QuestionFifteenComponent } from './components/questions/question-fifteen/question-fifteen.component';
import { MainComponent } from './components/main/main.component';
import { SecondOneComponent } from './components/questions/second-one/second-one.component';
import { SecondFourComponent } from './components/questions/second-four/second-four.component';

@NgModule({
  declarations: [
    QuizComponent,
    IntroductionComponent,
    QuestionsComponent,
    QuestionOneComponent,
    QuestionTwoComponent,
    QuestionThreeComponent,
    QuestionFourComponent,
    QuestionFiveComponent,
    QuestionSixComponent,
    QuestionEightComponent,
    QuestionTenComponent,
    ProgressBarComponent,
    GeneralInformationComponent,
    QuestionElevenComponent,
    QuestionTwelveComponent,
    QuestionFifteenComponent,
    MainComponent,
    SecondOneComponent,
    SecondFourComponent,
  ],
  imports: [
    CommonModule,
    QuizRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    CacheService
  ]
})
export class QuizModule { }
