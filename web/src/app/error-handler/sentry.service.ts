import { Injectable, ErrorHandler} from '@angular/core';
import * as Sentry from '@sentry/browser';
import {environment} from '../../environments/environment';
import {UserStore} from '../authentication/state';


@Injectable()
export class SentryService implements ErrorHandler {

  constructor( private userStore: UserStore) {
    Sentry.init({
      // dsn: 'http://32cd7241036c4c309e748858c577d962@localhost:9000/2' - local
      dsn: 'https://e12b3b494fa7473f8af35bb0df85b59c@o386758.ingest.sentry.io/5650059'
    });
  }

  handleError(error: any): void {
    const user = this.userStore.getValue();
    Sentry.configureScope(scope => {
      scope.setUser({
        id: user.id,
        username: user.username,
        email: user.email,
      });
    });

    const evendId = Sentry.captureException(error.originalError || error);
    if (environment.production) {
      Sentry.showReportDialog({ evendId });
    }

  }
}
