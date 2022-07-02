import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { message } from 'src/environments/en';
import { HttpParams } from '@angular/common/http';
import {SurveyService} from 'src/app/core/http/api/survey.service';

declare var $: any;

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  allSurveyData: Array<any> = [];
  activePage: string = "survey"
  surveyId: any
  page = 1;
  rowIndex = 1;
  pageSize = 3;
  limit: any;
  totalRecords : any
  searchText: any = "";
  Num: any = ['5' , '10' , '50']

  constructor(private toastr: ToastrService , private surveyService : SurveyService) { }

  ngOnInit(): void {
    this.getSurveys()
  }

  getSurveys() {
    try {
      let params = new HttpParams();
      params = params.append('page', this.page);
      params = params.append('limit', this.limit || this.Num[0]);
      params = params.append('search', this.searchText);
      params = params.append('modelName' , 'survey');
      this.surveyService.getSurveys(params).subscribe((res: any) => {
        this.allSurveyData = res.data.data;
        this.totalRecords = res.data.records;
      })
    } catch (error: any) {
      this.toastr.error(error.message)
      return
    }
  }

  deleteSurvey() {
    try {
      $('#deleteSurvey').modal('hide');
      this.surveyService.deleteSurvey(this.surveyId).subscribe((res: any) => {
        if (res.status == 'success') {
          this.toastr.success(message.survey.surveyDeleted);
          this.getSurveys()
        } else {
          this.toastr.error(res.error.errors.message);
        }
      })
    } catch (error: any) {
      this.toastr.error(error.message)
      return
    }
  }

  pageChange(e: any) {
    this.page = e;
    if(this.page>1){
      this.rowIndex = 1+ ((this.page-1)*this.pageSize)
    }else{
      this.rowIndex = 1
    }
    this.getSurveys()
  }

  search(e: any) {
    this.searchText = e.target.value
    this.getSurveys();
  }

  changeNum(e: any) {
    this.limit = e.target.value;
    this.getSurveys();
  }

  getSurveyData(survey : any){
    this.surveyId = survey._id
  }

  redirectToSurveyPage() {
    this.activePage = "survey";
    this.getSurveys()
  }

}
