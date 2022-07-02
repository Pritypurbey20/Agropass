import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { endPoints } from 'src/environments/endpoints';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpService: HttpService) { }

  getAllPayments: any = (params: any) => {
    return this.httpService.get(endPoints.payment, params);
  }

  createPayment: any = (data: any) => {
    return this.httpService.post(endPoints.payment, data);
  }

  updatePayment: any = (id: any, data: any) => {
    return this.httpService.put(`${endPoints.payment}/${id}`, data);
  }

  deletePayment: any = (id: any) => {
    return this.httpService.delete(`${endPoints.payment}/${id}`);
  }
}
