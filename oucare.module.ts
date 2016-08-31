import { NgModule, ModuleWithProviders } from '@angular/core';

import { ToastModule } from './toast';

@NgModule({
  imports: [
    ToastModule.forRoot()
  ],
  declarations: [],
  exports: [
    ToastModule
  ]
})
export class OUcareModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: OUcareModule,
      providers: [],
    };
  }
}
