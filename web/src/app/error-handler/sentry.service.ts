import {Injectable, ErrorHandler} from '@angular/core';
import * as Sentry from '@sentry/browser';
import {environment} from '../../environments/environment';
import {UserStore} from '../authentication/state';


@Injectable()
export class SentryService implements ErrorHandler {

  constructor(private userStore: UserStore) {
    Sentry.init({
      dsn: 'https://e12b3b494fa7473f8af35bb0df85b59c@o386758.ingest.sentry.io/5650059'
    });
  }

  handleError(error: any): void {
    const {id, username, email} = this.userStore.getValue();
    Sentry.configureScope(scope => {
      scope.setUser({
        id,
        username,
        email,
      });
    });

    const evendId = Sentry.captureException(error.originalError || error);
    if (environment.production) {
      Sentry.showReportDialog({evendId});
    }

    console.error(error);

  }
}
