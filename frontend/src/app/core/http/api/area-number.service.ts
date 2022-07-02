import { Injectable } from '@angular/core';
import { HttpService  } from '../http.service'
import { endPoints } from 'src/environments/endpoints';

@Injectable({
  providedIn: 'root'
})
export class AreaNumberService {

  constructor(private httpService: HttpService) { }

  getAreaNumber: any = (params:any) =>{
    return  this.httpService.get(endPoints.areaNumber , params)
  }

  getAllAreaNumber : any = () => {
    return this.httpService.get(endPoints.areaNumber)
  }

  createAreaNumber: any = (data: any) => {
    return this.httpService.post(endPoints.areaNumber, data)
  }

  updateAreaNumber: any = (id: any, data: any) => {
    return this.httpService.put(`${endPoints.areaNumber}/${id}`, data)
  }

  deleteAreaNumber: any = (id: any) => {
    return this.httpService.delete(`${endPoints.areaNumber}/${id}`)
  }
}
