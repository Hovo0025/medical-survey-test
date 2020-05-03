import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  public questionPosition$: Subject<object> = new Subject<object>();
  public readyToLoad$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}
