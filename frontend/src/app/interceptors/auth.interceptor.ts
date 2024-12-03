import {
  HttpEvent,
  HttpHandler,
  HttpInterceptorFn,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { AdminService } from '../services/admin.service';

@Injectable()
export class authInterceptor implements HttpInterceptor {
  constructor(private userServ: UserService, private adminServ: AdminService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    try {
      
      const userToken = this.userServ.getUserFromLocalStorage('user');
      const adminToken = this.adminServ.getAdminFromLocalStorage('admin');

      if (userToken) {
        request = request.clone({
          setHeaders: {
            Authorization: `UserBearer ${userToken.token}`,
          },
        });
      }

      if (adminToken) {
        request = request.clone({
          setHeaders: {
            Authorization: `AdminBearer ${adminToken.token}`,
          },
        });
      }
    } catch (err) {
      console.log("authErr",err);
      
    }
    finally{
      return next.handle(request);
    }
  }
}
