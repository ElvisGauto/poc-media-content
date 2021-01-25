import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  declare global {
    interface Window { 
      Recorder: any;
      webkitAudioContext: any;
      AudioContext: any;
      webkitURL: any;
    }

    interface Navigator {
      webkitGetUserMedia: any;
      msGetUserMedia: any;
      mozGetUserMedia: any;
    }
  }