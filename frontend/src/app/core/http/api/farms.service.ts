import { Injectable } from '@angular/core';
import { HttpService  } from '../http.service'
import { endPoints } from 'src/environments/endpoints';

@Injectable({
  providedIn: 'root'
})
export class FarmsService {

  constructor(private httpService: HttpService ) { }

  getFarms: any = (params:any) => {
    return this.httpService.get(endPoints.farms , params)
  }

  getAllFarms : any = () => {
    return this.httpService.get(endPoints.farms)
  }

  createFarm: any = (data: any) => {
    return this.httpService.post(endPoints.farms, data)
  }

  updateFarm: any = (id: any, data: any) => {
    return this.httpService.put(`${endPoints.farms}/${id}`, data)
  }

  deleteFarm: any = (id: any) => {
    return this.httpService.delete(`${endPoints.farms}/${id}`)
  }

}
