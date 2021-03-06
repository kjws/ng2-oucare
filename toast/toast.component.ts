import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { ToastService, ToastParam } from './toast.service';


@Component({
  selector: 'ou-toast',
  templateUrl: './toast.component.jade',
  styleUrls: ['./toast.component.less'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        animate(300, keyframes([
          style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
          style({ opacity: 1, transform: 'translateX(15px)', offset: 0.3 }),
          style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
        ]))
      ]),
      transition('* => void', [
        animate(300, keyframes([
          style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
          style({ opacity: 1, transform: 'translateX(-15px)', offset: 0.7 }),
          style({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 })
        ]))
      ])
    ])
  ]
})
export class ToastComponent {
  constructor(public toastService: ToastService) { }

  trackByToasts(index: number, toast: ToastParam) { return toast.id; }
}
