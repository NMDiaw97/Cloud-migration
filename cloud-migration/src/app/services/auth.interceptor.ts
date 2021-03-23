import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const skipInterceptor = request.headers.has('skip');

    if (skipInterceptor) {
      request = request.clone({
        headers: request.headers.delete('skip')
      });
    } else {

      const token = localStorage.getItem('token');
      console.log(' token ', token);
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ` + token
        }
      });
    }
    return next.handle(request);
  }
}
