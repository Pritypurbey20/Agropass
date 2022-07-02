import { Injectable } from '@angular/core';
import { HttpService  } from '../http.service'
import { endPoints } from 'src/environments/endpoints';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor(private httpService: HttpService) { }

  getArea: any = (params:any) =>{
    return  this.httpService.get(endPoints.area , params)
  }

  getAllArea : any = () => {
    return this.httpService.get(endPoints.area)
  }

  createArea: any = (data: any) => {
    return this.httpService.post(endPoints.area, data)
  }

  updateArea: any = (id: any, data: any) => {
    return this.httpService.put(`${endPoints.area}/${id}`, data)
  }

  deleteArea: any = (id: any) => {
    return this.httpService.delete(`${endPoints.area}/${id}`)
  }

}
