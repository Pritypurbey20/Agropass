import { Injectable } from '@angular/core';
import { HttpService  } from '../http.service'
import { endPoints } from 'src/environments/endpoints';

@Injectable({
  providedIn: 'root'
})
export class CropTypeService {

  constructor(private httpService: HttpService ) { }

  getCropType: any = (params:any) => {
    return this.httpService.get(endPoints.cropType , params)
  }

  getAllCropType : any = () => {
    return this.httpService.get(endPoints.cropType)
  }

  createCropType: any = (data: any) => {
    return this.httpService.post(endPoints.cropType, data)
  }

  updateCropType: any = (id: any, data: any) => {
    return this.httpService.put(`${endPoints.cropType}/${id}`, data)
  }

  deleteCropType: any = (id: any) => {
    return this.httpService.delete(`${endPoints.cropType}/${id}`)
  }

}
