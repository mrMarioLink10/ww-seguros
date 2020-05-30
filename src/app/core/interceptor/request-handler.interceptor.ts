import { Observable, from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from '../services/user/user.service';

@Injectable()
export class RequestHandlerInterceptor implements HttpInterceptor {
    constructor(private userService: UserService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // return from(this.handleAccess(request, next));
        const token = this.userService.getAccessToken();
        if (token) {
            request = request.clone({
                setHeaders: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(request).pipe(tap(() => { },
            (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    console.log(err);

                    if (err.status === 401) {
                        window.location.reload();
                    }
                    return;
                }
            }));
    }

    // private async handleAccess(request: HttpRequest<any>, next: HttpHandler):
    //     Promise<HttpEvent<any>> {
    //     const token = await this.userService.getAccessToken();
    //     let changedRequest = request;
    //     // HttpHeader object immutable - copy values
    //     const headerSettings: { [name: string]: string | string[]; } = {};

    //     for (const key of request.headers.keys()) {
    //         headerSettings[key] = request.headers.getAll(key);
    //     }
    //     if (token) {
    //         headerSettings.Authorization = 'Bearer ' + token;
    //     }
    //     headerSettings['Content-Type'] = 'application/json';
    //     const newHeader = new HttpHeaders(headerSettings);

    //     changedRequest = request.clone({
    //         headers: newHeader
    //     });
    //     return next.handle(changedRequest).toPromise();
    // }

}
