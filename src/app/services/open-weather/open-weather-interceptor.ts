import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class OpenWeatherInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // we skip all requests except the ones going to openweather api
        if (!req.url.includes(environment.apiBaseUrl))
            return next.handle(req);

        const apiKey = '&appid=' + environment.apiKey;
        const newReq = req.clone({
            url: req.url + apiKey
        });

        return next.handle(newReq);
    }
}
