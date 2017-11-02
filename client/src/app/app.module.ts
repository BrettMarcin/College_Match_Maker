import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpModule} from '@angular/http';
import 'rxjs/add/operator/map';

import { FormDataComponent } from './components/form-data/form-data.component';
import { CollegeService } from './services/college.service';


@NgModule({
  declarations: [
    AppComponent,
    FormDataComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    CollegeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
