import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appMoveNextByMaxLength]',
})
export class MoveNextByMaxLengthDirective {
  public prevValue: string;

  constructor() {
  }

  @HostListener('keydown', ['$event']) onKeyPress(e: any) {
    if (e.key === 'Backspace' || e.keyCode === 8 || e.key === 'Delete' || e.keyCode === 46) {
      this.prevValue = e.target.value;
    }
  }

  @HostListener('keyup', ['$event']) onKeyDown(e: any) {
    if (e.key === 'Backspace' || e.keyCode === 8 || e.key === 'Delete' || e.keyCode === 46) {
      if (!this.prevValue) {
        if (e.srcElement.maxLength > e.srcElement.value.length) {

          e.preventDefault();

          let prevControl: any = e.srcElement.previousElementSibling;
          while (true) {
            if (prevControl) {
              if (prevControl.type === e.srcElement.type) {
                e.srcElement.previousElementSibling.value = '';
                setTimeout(() => {
                  prevControl.focus();
                }, 25);
                return;
              } else {
                prevControl = prevControl.previousElementSibling;
              }
            } else {
              return;
            }
          }
        }
      }
    } else {
      if (e.srcElement.maxLength === e.srcElement.value.length) {
        e.preventDefault();
        let nextControl: any = e.srcElement.nextElementSibling;
        while (true) {
          if (nextControl) {
            if (nextControl.type === e.srcElement.type) {
              setTimeout(() => {
                nextControl.focus();
              }, 25);
              return;
            } else {
              nextControl = nextControl.nextElementSibling;
            }
          } else {
            return;
          }
        }
      }
    }
    return;
  }
}
