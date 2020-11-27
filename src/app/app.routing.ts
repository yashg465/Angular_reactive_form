import {Routes,RouterModule} from '@angular/router';
import { DataComponent } from './CRUD/data.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';


const arr: Routes=[

  {path:'CRUD',component:DataComponent},
  {path:'reactive-form',component:ReactiveFormComponent},


];

export const arrRouting= RouterModule.forRoot(arr);

