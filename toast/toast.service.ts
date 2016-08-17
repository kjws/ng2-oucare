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
  private _default: ToastParam = DEFAULT;
  private _toastList: ToastParam[] = [];
  private _idMap: any = {};

  constructor(private _ngZone: NgZone) { }

  get toastList() {
    return this._toastList;
  }

  [Symbol.iterator]() {
    return this.toastList.values();
  }

  create(toastParam: ToastParam | string): number {
    let toast: ToastParam = this.parseToast(toastParam);

    toast.id = this.getId();

    // this._toastList.unshift(toast);
    this._toastList.push(toast);

    if (toast.dismissOnTimeout) {
      setTimeout(() => this._ngZone.run(() => this.dismiss(toast.id)), toast.timeout);
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
      return _.merge({}, this._default, { content: toastParam });
    } else {
      return _.merge({}, this._default, toastParam);
    }
  }

  dismiss(id: number): any {
    const index = _.findIndex(this._toastList, { id });
    this._toastList.splice(index, 1);
    delete this._idMap[id];
  };

  private getId(): number {
    let id = this._toastList.length;
    while (this._idMap[id]) { id++; }
    this._idMap[id] = true;
    return id;
  }
}
