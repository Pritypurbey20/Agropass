import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { endPoints } from 'src/environments/endpoints';

@Injectable({
  providedIn: 'root'
})
export class DistilleryService {

  constructor(private httpService: HttpService) { }

  getDistillery: any = (params: any) => {
    return this.httpService.get(endPoints.distillery, params);
  }

  createDistillery: any = (data: any) => {
    return this.httpService.post(endPoints.distillery, data);
  }

  updateDistillery: any = (id: any, data: any) => {
    return this.httpService.put(`${endPoints.distillery}/${id}`, data);
  }

  deleteDistillery: any = (id: any) => {
    return this.httpService.delete(`${endPoints.distillery}/${id}`);
  }

  distilleryBatchInfo: any = () => {
    return this.httpService.get(`${endPoints.distillery}/all/distilleries`);
  }
}
