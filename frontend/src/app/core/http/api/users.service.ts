import { Injectable } from '@angular/core';
import { HttpService  } from '../http.service'
import { endPoints } from 'src/environments/endpoints';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpService: HttpService ) { }

  validateUser: any = (data: any) => {
    return this.httpService.postLogin(endPoints.validateUser, data)
  }

  registerUser: any = (data: any) => {
    return this.httpService.postLogin(endPoints.registerUser, data)
  }

  getUser: any = (params:any) => {
    return this.httpService.get(`${endPoints.user}/` , params)
  }

  createUser: any = (data: any) => {
    return this.httpService.post(`${endPoints.user}/`, data)
  }

  updateUser: any = (id: any, data: any) => {
    return this.httpService.patch(`${endPoints.user}/${id}`, data)
  }

  deleteUser: any = (id: any) => {
    return  this.httpService.delete(`${endPoints.user}/${id}`)
  }

  getMe: any = () => {
    return this.httpService.get(endPoints.getMe)
  }

  updateMe: any = (data: any) => {
    return this.httpService.patch(endPoints.updateMe, data)
  }


}