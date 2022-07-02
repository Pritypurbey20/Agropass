import { Injectable } from '@angular/core';
import { HttpService  } from '../http.service'
import { endPoints } from 'src/environments/endpoints';

@Injectable({
  providedIn: 'root'
})
export class WhatsappService {

  constructor(private httpService: HttpService) { }

  sendMessgae : any = (data: any) => {
    return this.httpService.post(`${endPoints.whatsApp}/surveyMessage`, data)
  }
}
