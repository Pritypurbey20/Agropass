import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { message } from 'src/environments/en';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { constVariable } from '../../../../environments/const';
import { WhatsappService } from 'src/app/core/http/api/whatsapp.service';
import { SurveyService } from 'src/app/core/http/api/survey.service';
import { AreaService } from 'src/app/core/http/api/area.service';

@Component({
  selector: 'app-whatsapp',
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.css']
})
export class WhatsappComponent implements OnInit {

  areaData: Array<any> = [];
  allSurveyData: Array<any> = [];
  areaNumberId: any

  sendMsgForm = new FormGroup({
    areaId: new FormControl(''),
    surveyId: new FormControl(''),
  })

  isSubmitted: boolean = false;
  surveyIdRequired = message.whatsapp.surveyIdRequired
  areaIdRequired = message.whatsapp.areaIdRequired

  constructor(private fb: FormBuilder, private toastr: ToastrService, private areaService: AreaService, private whatsappService: WhatsappService, private surveyService: SurveyService) {
    this.sendMsgForm = this.fb.group({
      areaId: ['', Validators.required],
      surveyId: ['', Validators.required],
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.sendMsgForm.controls;
  }

  ngOnInit(): void {
    this.getAreaNumber();
    this.getAllSurvey();
  }


  getAreaNumber() {
    try {
      this.areaService.getAllArea().subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          this.areaData = res.data.data;
        } else {
          this.toastr.error(res.error.errors.message);
        }
      })
    } catch (error: any) {
      this.toastr.error(error.message);
    }
  }

  getAllSurvey() {
    try {
      this.surveyService.getAllSurveys().subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          this.allSurveyData = res.data.data;
        } else {
          this.toastr.error(res.error.errors.message);
        }
      })

    }
    catch (error: any) {
      this.toastr.error(error.message);
    }
  }


  sendMessage() {
    try {
      this.isSubmitted = true
      if (!this.sendMsgForm.valid) {
        return;
      }
      this.whatsappService.sendMessgae(this.sendMsgForm.value).subscribe((res: any) => {
        console.log("Response" , res)
        if (res.status == constVariable.SUCCESS) {
          this.toastr.success(message.whatsapp.msgSent);
          // this.sendMsgForm.reset();
        } else {
          this.toastr.error(res.error.errors.message);
        }
      })

    } catch (error: any) {
      this.toastr.error(error.message);
    }
  }

}
