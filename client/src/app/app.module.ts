import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpModule} from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import 'rxjs/add/operator/map';

import { FormDataComponent } from './components/form-data/form-data.component';
import { CollegeService } from './services/college.service';
import { CollegesPageComponent } from './components/colleges-page/colleges-page.component';
import { CollegeComponent } from './components/college/college.component';
import { ApiComponent } from './components/api/api.component';

const appRoutes: Routes = [
  {path:'', component:FormDataComponent},
  {path:'colleges', component:CollegesPageComponent},
  {path:'college/:theCollege', component:CollegeComponent},
  {path:'API_1.0', component:ApiComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    FormDataComponent,
    CollegesPageComponent,
    CollegeComponent,
    ApiComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    CollegeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
