import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { AppStateService } from './app-state.service';
import { LoadingService } from './loading.service';

@Injectable()
export class HttpAppInterceptor implements HttpInterceptor {
  constructor(private appState: AppStateService, private ld: LoadingService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.ld.showLoading();

    const req = request.clone({
      setHeaders: {
        Authorization: `Bearer TEST`,
      },
    });

    return next.handle(req).pipe(
      finalize(() => {
        this.ld.hideLoading();
      })
    );
  }
}
