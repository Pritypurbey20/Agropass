import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpService } from '../http.service'
import { endPoints } from 'src/environments/endpoints';
import { GlobalService } from '../../utils/global.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { constVariable } from 'src/environments/const';
const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CropsService {

  constructor(private httpService: HttpService, private http: HttpClient, private globalService: GlobalService) { }

  getCrops: any = (params: any) => {
    return this.httpService.get(endPoints.crops, params)
  }

  getAllCrops: any = () => {
    return this.httpService.get(endPoints.crops)
  }

  createCrop: any = (data: any) => {
    return this.http.post(API_URL + endPoints.crops, data, { headers: new HttpHeaders({ authorization: `${constVariable.BEARER} ${this.globalService.getAuthToken()}` }) })
  }
  
  updateCrop: any = (id: any, data: any) => {
    return this.http.put(API_URL + `${endPoints.crops}/${id}`, data, { headers: new HttpHeaders({ authorization: `${constVariable.BEARER} ${this.globalService.getAuthToken()}` }) })
  }

  deleteCrop: any = (id: any) => {
    return this.httpService.delete(`${endPoints.crops}/${id}`)
  }
}
