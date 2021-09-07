import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
console.log("hiiiiiiiiiiiiiii")
console.log("1234")
console.log("12334444444444")

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
