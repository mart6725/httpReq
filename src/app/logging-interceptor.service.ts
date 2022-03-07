import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, tap } from "rxjs";

export class LoggingInterceptorService implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler){
        console.log('Outgoing request')
        console.log(req.url)
        return next.handle(req).pipe(tap(event => {
            if(event.type=== HttpEventType.Response){
                console.log('incoming response');
                console.log(event.body)
            }
        }));

    }
}