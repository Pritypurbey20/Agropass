import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth/auth.guard';
// import { SearchFilterPipe } from './utils/search-filter.pipe';
@NgModule({
  declarations: [
    // SearchFilterPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [ AuthGuard ]
})
export class CoreModule { }
