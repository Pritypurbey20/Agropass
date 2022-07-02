import { Injectable } from '@angular/core';
import { HttpService  } from '../http.service'
import { endPoints } from 'src/environments/endpoints';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private httpService: HttpService ) { }

  getPermission: any = (params:any) => {
    return this.httpService.get(endPoints.permission , params)
  }

  createPermission: any = (data: any) => {
    return this.httpService.post(endPoints.permission, data)
  }

  updatePermission: any = (id: any, data: any) => {
    return this.httpService.put(`${endPoints.permission}/${id}`, data)
  }

  deletePermission: any = (id: any) => {
    return this.httpService.delete(`${endPoints.permission}/${id}`)
  }
}
