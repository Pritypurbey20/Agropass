import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalService } from '../utils/global.service';
import { ToastrService } from 'ngx-toastr';
import { constVariable } from 'src/environments/const';
const API_URL = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient, private globalService: GlobalService, private toastr: ToastrService) { }

  getHeaders = () => {
    const token = this.globalService.getAuthToken();
    const headers = new HttpHeaders({
      'content-type': constVariable.APPLICATION_JSON , authorization: `${constVariable.BEARER} ${token}`
    });
    return headers;
  }

  postLogin = (apiRoute: any, body: any) => {
    return this.httpClient.post(API_URL + apiRoute, body).pipe(catchError(this.handleError));
  }

  logout = (apiRoute: any, acctoken: any) => {
    const headers = this.getHeaders();
    return this.httpClient.post(API_URL + apiRoute, undefined, {
      headers: new HttpHeaders({
        'authorization': acctoken,
      })
    }).pipe();
  }

  // post request
  post = (apiRoute: any, body: any) => {
    const headers = this.getHeaders();
    return this.httpClient.post(API_URL + apiRoute, body, { headers: headers }).pipe(catchError(this.handleError));
  }


  // get request
  get = (apiRoute: any , params?:any) => {
    const headers = this.getHeaders();
    return this.httpClient.get(API_URL + apiRoute, { headers: headers , params: params }).pipe(catchError(this.handleError));
  }

  // put request
  put = (apiRoute: any, body: any) => {
    const headers = this.getHeaders();
    return this.httpClient.put(API_URL + apiRoute, body, { headers: headers }).pipe(catchError(this.handleError));
  }

  // patch request

  patch = (apiRoute: any, body: any) => {
    const headers = this.getHeaders();
    return this.httpClient.patch(API_URL + apiRoute, body, { headers: headers }).pipe(catchError(this.handleError));
  }

  // delete request
  delete = (apiRoute: any) => {
    const headers = this.getHeaders();
    return this.httpClient.delete(API_URL + apiRoute, { headers: headers }).pipe(catchError(this.handleError));
  }

  // handler error
  handleError = (error: HttpErrorResponse) => {
    let errorMessage = constVariable.UNKNOWN_ERROR;
    if (error.error instanceof ErrorEvent) {
      this.toastr.error(error.error.message)
    } else {
      this.toastr.error(error.error.message)
    }
    if (error.status === 401) {
      this.globalService.unauthorizeUser();
    }
    return throwError(() => new Error(errorMessage))
  }
}
