import { Injectable } from '@angular/core';
import { HttpService } from '../http.service'
import { endPoints } from 'src/environments/endpoints';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private httpService: HttpService) { }

  getSurveys: any = (params: any) => {
    return this.httpService.get(endPoints.surveys, params)
  }

  getAllSurveys: any = () => {
    return this.httpService.get(endPoints.surveys)
  }

  createSurvey: any = (data: any) => {
    return this.httpService.post(endPoints.surveys, data)
  }

  updateSurvey: any = (id: any, data: any) => {
    return this.httpService.put(`${endPoints.surveys}/${id}`, data)
  }

  deleteSurvey: any = (id: any) => {
    return this.httpService.delete(`${endPoints.surveys}/${id}`)
  }
}
