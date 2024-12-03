import { Inject, Injectable } from "@angular/core";
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
  } from '@angular/common/http';
import { finalize, Observable } from "rxjs";
import { LoadingService } from "../services/loading.service";

@Injectable()
export class loadingInterceptor implements HttpInterceptor{ 
    constructor(private loadingServ:LoadingService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loadingServ.showloading();

        return next.handle(req).pipe(
            finalize(()=>{
                this.loadingServ.loading.subscribe(res=>{
                    console.log("hai",res);
                    
                })
                this.loadingServ.hideloading();
            })
        )
    }
}