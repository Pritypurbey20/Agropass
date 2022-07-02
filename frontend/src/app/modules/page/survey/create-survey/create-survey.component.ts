import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SurveyService } from 'src/app/core/http/api/survey.service';
import { constVariable } from 'src/environments/const';
import { message } from 'src/environments/en';
@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})
export class CreateSurveyComponent implements OnInit {

  @Output() cancelEvent = new EventEmitter()
  optionsArray: Array<any> = [];
  currentValue: string = '';
  newSurveyForm: FormGroup = new FormGroup({
    surveyName: new FormControl(''),
    surveyQuestion: new FormControl(''),
    surveyOptions: new FormControl(''),
  })

  isSubmitted: boolean = false;
  surveyNameRequired = message.survey.surveyNameRequired
  surveyQuestionRequired = message.survey.surveyQuestionRequired
  surveyAnswerOptionsRequired = message.survey.surveyAnswerOptionsRequired
  option: any;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private surveyService: SurveyService) {
    this.newSurveyForm = this.fb.group({
      surveyName: ['', Validators.required],
      surveyQuestion: ['', Validators.required],
      surveyOptions: ['', Validators.required],
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.newSurveyForm.controls;
  }

  ngOnInit(): void {
  }

  createSurvey() {
    try {
      this.isSubmitted = true
      if (!this.newSurveyForm.valid) {
        return;
      }
      const body = {
        surveyName: this.newSurveyForm.value.surveyName,
        surveyQuestion: this.newSurveyForm.value.surveyQuestion,
        surveyAnswerOptions: this.optionsArray
      }

      if (this.optionsArray.length < 2) {
        this.toastr.error(message.survey.optionValidation);
        return;
      }
      this.surveyService.createSurvey(body).subscribe((res: any) => {
        if (res.status == constVariable.SUCCESS) {
          this.toastr.success(message.survey.surveyCreated);
          this.backTolisting()
        } else {
          this.toastr.error(res.error.erros.message);
        }
      })
    } catch (error: any) {
      this.toastr.error(error.message);
    }
  }
  backTolisting() {
    this.cancelEvent.emit();
  }

  textchange(event: any) {
    this.currentValue = event.target.value;
    event.target.value = '';
    this.optionsArray.push(this.currentValue)
  }

  deleteOption(option: any) {
    this.optionsArray.splice(option, 1)
  }
}
