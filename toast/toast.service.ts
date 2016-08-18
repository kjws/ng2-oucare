import { Injectable, NgZone } from '@angular/core';

import * as _ from 'lodash';


export interface IToastService {
  create(toastParam: ToastParam | string): number;
  dismiss(id: number): any;
}

export interface ToastParam {
  id?: number;
  content: string;
  className?: 'success' | 'info' | 'warning' | 'danger';
  dismissOnTimeout?: boolean;
  timeout?: number;
}

const DEFAULT: ToastParam = {
  content: '',
  className: 'success',
  dismissOnTimeout: true,
  timeout: 4000,
}

@Injectable()
export class ToastService implements IToastService {
  private default: ToastParam = DEFAULT;
  private toastList: ToastParam[] = [];
  private idMap: any = {};

  constructor(private ngZone: NgZone) { }

  [Symbol.iterator]() {
    return this.toastList.values();
  }

  create(toastParam: ToastParam | string): number {
    let toast: ToastParam = this.parseToast(toastParam);

    toast.id = this.getId();

    // this._toastList.unshift(toast);
    this.toastList.push(toast);

    if (toast.dismissOnTimeout) {
      setTimeout(() => this.ngZone.run(() => this.dismiss(toast.id)), toast.timeout);
    }

    return toast.id;
  }

  success(toastParam: ToastParam | string): number {
    let toast: ToastParam = this.parseToast(toastParam);
    toast.className = 'success';
    return this.create(toast);
  }

  info(toastParam: ToastParam | string): number {
    let toast: ToastParam = this.parseToast(toastParam);
    toast.className = 'info';
    return this.create(toast);
  }

  warning(toastParam: ToastParam | string): number {
    let toast: ToastParam = this.parseToast(toastParam);
    toast.className = 'warning';
    return this.create(toast);
  }

  danger(toastParam: ToastParam | string): number {
    let toast: ToastParam = this.parseToast(toastParam);
    toast.className = 'danger';
    return this.create(toast);
  }

  private parseToast(toastParam: ToastParam | string): ToastParam {
    if (typeof toastParam === 'string') {
      return _.merge({}, this.default, { content: toastParam });
    } else {
      return _.merge({}, this.default, toastParam);
    }
  }

  dismiss(id: number): any {
    const index = _.findIndex(this.toastList, { id });
    this.toastList.splice(index, 1);
    delete this.idMap[id];
  };

  private getId(): number {
    let id = this.toastList.length;
    while (this.idMap[id]) { id++; }
    this.idMap[id] = true;
    return id;
  }
}
