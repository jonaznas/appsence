import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SupabaseService } from 'src/app/authentication/supabase.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(
    private supabaseService: SupabaseService
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.handleRequest(request, next);
  }

  private handleRequest(request: HttpRequest<unknown>, next: HttpHandler) {
    const session = this.supabaseService.getSession();

    request = request.clone({
      url: environment.apiUrl + request.url
    });

    if (!session?.access_token) {
      return next.handle(request);
    }

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${ session.access_token }`
      }
    });

    return next.handle(request);
  }
}
