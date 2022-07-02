import { Injectable } from '@angular/core';
import { HttpService  } from '../http.service'
import { endPoints } from 'src/environments/endpoints';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private httpService: HttpService) {}

  getPurchase: any = (params:any) => {
    return this.httpService.get(endPoints.purchase , params)
  }

  createPurchase: any = (data: any) => {
    return this.httpService.post(endPoints.purchase, data)
  }

  updatePurchase: any = (id: any, data: any) => {
    return this.httpService.put(`${endPoints.purchase}/${id}`, data)
  }
  
  deletePurchase: any = (id: any) => {
    return this.httpService.delete(`${endPoints.purchase}/${id}`)
  }
  
}
