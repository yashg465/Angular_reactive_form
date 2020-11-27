import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, FormGroupName } from '@angular/forms';
import { ReactiveFormService } from './reactive-form.service';
import { basic, present, permanent, skill, qualification, experience } from './forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {


  BasicInformation: FormGroup;
  AddressDetails: FormGroup;
  PersonalDetails: FormGroup;
  BankDetails: FormGroup;
  qualificationform: FormGroup;

 qualiarr: any [] = [];
  qualification;
  institute;
  year;
  score;

 skillarr:any [] = [];
 skillcatogary;
 skill;
 skilllevel;

  flag1:boolean=true;       //Basic Information     //Personal Details         //Bank Details
  flag2:boolean=false;      //Address Details
  flag3:boolean=false;      //Qualification



  Address: String;
  City: string;
  Country: string;
  State: string;
  District: string;
  Pin: string;
  age: number;


  arrBasicInformation:basic []=[];
  Basic:any;
  present:any;
  permanent:any;
  experience:any;


  constructor(private fb:FormBuilder, private _data:ReactiveFormService ) { }

  ngOnInit(): void {

    this._data.getAllbasic().subscribe(
      (data:basic[])=>{
       this.Basic=data;
     }
    );

    this._data.getAllpresent().subscribe((data: present[]) => {
      this.present = data;
    });

    this._data.getAllpermanent().subscribe((data: permanent[]) => {
      this.permanent = data;
    });

    this._data.getAllskill().subscribe((data: skill[]) => {
      this.skill = data;
    });

    this._data.getAllqualification().subscribe((data: qualification[]) => {
      this.qualification = data;
    });

    this._data.getAllexperience().subscribe((data: experience[]) => {
      this.experience = data;
    });



    // Bacis Information below

    this.BasicInformation=new FormGroup ({

      Employee_no: new FormControl(null,[ Validators.required,]),
      Title: new FormControl(null, [Validators.required,]),
      Addressed_as: new FormControl(null,[Validators.required,]),
      First_Name: new FormControl(null,[Validators.required,Validators.minLength(5),]),
      Middle_Name: new FormControl(null, [Validators.required, ]),
      Last_Name: new FormControl(null,[Validators.required, ]),
      Initials: new FormControl(null,[Validators.required,]),
      user_gender: new FormControl("Male"),
      dob: new FormControl(),
      Employee_Age: new FormControl(null,[Validators.required,]),
      Official_Phone: new FormControl(null,[Validators.required,]),
      Personal_Mobile: new FormControl(null,[Validators.required,]),
      Fax: new FormControl(null,[Validators.required,]),
      Official_Email: new FormControl(null,[Validators.required,]),
      Personal_Email: new FormControl(null,[Validators.required,]),
      Personal_Email_2: new FormControl(null,[Validators.required,]),
      Personal_Email_3: new FormControl(null,[Validators.required,]),
      file: new FormControl(null,[Validators.required, ]),
      birth_place: new FormControl(null,[Validators.required,]),
      religion: new FormControl("Hindu",Validators.required),
      caste: new FormControl("Gujarati",Validators.required),
      domicile: new FormControl(null,[Validators.required]),
      nationality: new FormControl("Indian",Validators.required),
      voter_id: new FormControl(null,[Validators.required]),
      pan_no:  new FormControl(null,[Validators.required]),
      aadhaar_no: new FormControl(null,[Validators.required]),
      maritial_status: new FormControl("Married",Validators.required),
      no_of_status: new FormControl(null,[Validators.required]),
      marriage_date: new FormControl(null,[Validators.required]),
     //Spouse_Name:  new FormControl(null,[Validators.required]),
     account_type:  new FormControl(null,[Validators.required]),
     payment_type: new FormControl(null,[Validators.required]),
     account_no:  new FormControl(null,[Validators.required]),
     branch_details: new FormControl(null,[Validators.required]),
     ifsc_code:  new FormControl(null,[Validators.required]),
  bank_name:  new FormControl(null,[Validators.required]),
  reimbursement_bank_name:  new FormControl(null,[Validators.required]),
  reimbursement_account_no:  new FormControl(null,[Validators.required]),



  });

  this.BasicInformation.get('dob').valueChanges.subscribe((x) => this.setAge(x));
  //



    // Address Details Below

    this.AddressDetails=new FormGroup ({

      present_address: new FormControl(null,[ Validators.required,]),
      city: new FormControl(null,[ Validators.required,]),
      country: new FormControl("India", Validators.required,),
      state: new FormControl("Mumbai",Validators.required,),
      district: new FormControl("Malabar_hills",Validators.required,),
      pin: new FormControl(null,[ Validators.required,]),

      address_permanent: new FormControl(null,[ Validators.required,]),
      percity: new FormControl(null,[ Validators.required,]),
      percountry: new FormControl("India",Validators.required),
      perstate: new FormControl("Mumbai",Validators.required),
      perdistrict: new FormControl("Malabar_hills",Validators.required),
      perpin: new FormControl(null,[ Validators.required,]),
      phone1: new FormControl(null,[ Validators.required,]),
      phone2: new FormControl(null,[ Validators.required,]),
      fax_mobile: new FormControl(null,[ Validators.required,]),
      personal_email: new FormControl(null,[ Validators.required,]),
      form: new FormControl(),




    });
    this.AddressDetails.get('form').valueChanges.subscribe((x) => this.setAddress(x));


    // Personal Details Below



 this.PersonalDetails=new FormGroup({

   });


       // Bank Details below


this.BankDetails=new FormGroup({Bank_Name: new FormControl(null,[Validators.required,]),

  });

     // Qualification, Previous Employment, Skill Set


this.qualificationform = new FormGroup ({
  user_qualification: new FormArray ([]),
  user_experience: new FormArray ([]),
  user_skill: new FormArray ([]),


});

this.qualificationform=this.fb.group({
  qualification_details:this.fb.array([this.qualificationgroup()]),
skill_details:this.fb.array([this.skillgroup()]),
experience_details:this.fb.array([this.experiencegroup()]),
});

this.qualificationform.controls['qualification_details'].valueChanges.subscribe(value=>{});
this.qualificationform.controls['skill_details'].valueChanges.subscribe(value=>{});
this.qualificationform.controls['experience_details'].valueChanges.subscribe(value=>{});


}


// OnBasicInformation(){

//   this._data.addbasic(this.BasicInformation.value).subscribe(
//     (x:any)=>{
//         this.arrBasicInformation.push(this.BasicInformation.value);
//         alert('Saved Successfully');
//         console.log('new details', this.BasicInformation.value);
//     });

// }

OnBasicInformation()
{
  this._data.addbasic(this.BasicInformation.value).subscribe((x)=>
   {
     this.arrBasicInformation.push(this.BasicInformation.value);
     alert("Data Added successfully!....");
     //console.log('Basic Information', JSON.stringify(this.BasicInformation.value));
   });
}

    //  OnBasicInformation(){
    //  console.log(this.BasicInformation);
    //  }

     OnAddressDetails(){
      console.log(this.AddressDetails);
     }

     OnPersonalDetails(){
      console.log(this.PersonalDetails);
     }

     OnBankDetails(){
      console.log(this.BankDetails);
     }

     onAddSkillClick(){
      this.skillarrr.push(this.skillgroup());
    }



     get qualiarray(){
      return<FormArray>this.qualificationform.get('qualification_details');
    }

    get experiencearray(){
      return<FormArray>this.qualificationform.get('experience_details');
    }

    onEditQualificationClick(){
      this.qualiarray.reset();
      }

     addqualification(){
     this.qualiarray.push(this.qualificationgroup());
    }

    deletequalification(index){
    this.qualiarray.removeAt(index);
   }

   addexperience(){
    this.experiencearray.push(this.experiencegroup());
  }

  deleteexperience(index){
    this.experiencearray.removeAt(index);
  }


  qualificationgroup(){
    return this.fb.group({
      qualification:new FormControl(null,[Validators.required]),
      institute:new FormControl(null,[Validators.required]),
      passing_year:new FormControl(null,[Validators.required]),
      score:new FormControl(null,[Validators.required]),
    })
  }

  experiencegroup(){
    return this.fb.group({
      from_date:new FormControl(null,[Validators.required]),
      to_date:new FormControl(null,[Validators.required]),
      organisation:new FormControl(null,[Validators.required]),
      experience:new FormControl(null,[Validators.required]),
    })
  }

  resetexperience(){
    this.experiencearray.reset();
  }

  skillgroup(){
    return this.fb.group({
      skill_cat:new FormControl(null,[Validators.required]),
      skill:new FormControl(null,[Validators.required]),
      skill_level:new FormControl(null,[Validators.required]),
      is_current :new FormControl(null,[Validators.required]),
      //experience:new FormControl(null,[Validators.required]),
    })
  }


  getang(form):Array<any>{
    return form.controls.qualification_details.controls;
  }


  get skillarrr(){return <FormArray>this.qualificationform.get ('skill_details')};

  duplicate(qualification):boolean{
  let myarr=this.getang(this.qualificationform);
  let text=myarr.filter(data=>data.controls.qualification.value==qualification && qualification !=null)
  if (text.length>1){
    return true;
  }
  else{
    return false;
  }
}



getskill(form):Array<any>{
  return form.controls.skill_details.controls;
}

  duplicateskill(skill):boolean{
    let myskill=this.getskill(this.qualificationform);
    let textskill=myskill.filter(data=>data.controls.skill.value==skill && skill !=null)
    if (textskill.length>1){
      return true;
    }
    else{
      return false;
    }
  }


  getexperience(form):Array<any>{
    return form.controls.experience_details.controls;
  }

  duplicateExperience(fromdate):boolean{
    let myskill=this.getexperience(this.qualificationform);
    let textskill=myskill.filter(data=>data.controls.from_date.value==fromdate && fromdate !=null)
    if (textskill.length>1){
      return true;
    }
    else{
      return false;
    }
  }

  Overlapping(fromdate):boolean{
    let myskill=this.getexperience(this.qualificationform);
    let textskill=myskill.filter(data=>data.controls.todate.value >= fromdate && fromdate !=null)
    if (textskill.length>1){
      return true;
    }
    else{
      return false;
    }
  }


    onSaveSkillClick(){
      alert("Skills saved successfully")
    }

    onEditSkillClick(){
      alert("edit skills")
    }

    onDeleteSkillClick(c){
      this.skillarrr.removeAt(c);
    }


    onNextClick(){
      this.flag1=false;
      this.flag2=true;
      console.log(this.BasicInformation.value);
   }

   onNextClick1(){
    this.flag2=false;
    this.flag3=true;
    console.log(this.AddressDetails.value);
   }


  OnSubmitClick(){
    this.flag1=false;
    this.flag2=true;
    alert("Details submitted successfully");
    console.log(this.BasicInformation.value);

  }


    onPreviousClick(){
      this.flag1=true;
      this.flag2=false;
    }

    onPreviousClick1(){
      this.flag2=true;
      this.flag3=false;
    }

    // onBackClick(){
    //   this.flag3=false;
    //   this.flag2=true;
    // }


    OnLastSubmitClick(){
      alert("Details submitted successfully")
    }


     setAge(val: Date){
    var td=new Date();
    var py=td.getFullYear();
    var doby = new Date(val).getFullYear();      //Age from Basic Information
    var ans=py-doby;
    console.log(ans);
    this.age=ans;
     }


setAddress(val:boolean){
  if(val){
      this.Address=this.AddressDetails.get('Permanent_Address').value;
    this.City=this.AddressDetails.get('City').value;
    this.Country=this.AddressDetails.get('Permanent_Country').value;                    //Address from Address Details
    this.State=this.AddressDetails.get('Permanent_State').value;
    this.District=this.AddressDetails.get('Permanent_District').value;
    this.Pin=this.AddressDetails.get('Permanent_Pin').value;
        }
  else{
    this.Address=null;
    this.City=null;
    this.Country=null;
    this.State=null;
    this.District=null;
    this.Pin=null;
      }
 }

}
