import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, RequiredValidator, FormArray } from '@angular/forms';
import { Profile } from '../../models/profiles.model';
import { EntityServices, EntityCollectionService } from '@ngrx/data';

@Component({
  selector: 'classifieds-ui-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {

  individualRequiredFields = ['firstName', 'lastName', 'preferredName'];
  businessRequiredFields = ['companyName'];

  orientation = 'horizontal';

  files: Array<File> = [];

  profileForm = this.fb.group({
    type: ['', Validators.required ],
    subtype: [{ value:'', disabled: true }, Validators.required],
    adspace: ['', Validators.required ],
    firstName: [''],
    lastName: [''],
    middleName: ['' ],
    preferredName: [''],
    title: [''],
    companyName: [''],
    phoneNumbers: this.fb.array([]),
    locations: this.fb.array([])
  });

  /*contactForm = this.fb.group({
    phoneNumbers: this.fb.array([]),
    locations: this.fb.array([])
  });*/

  private profilesService: EntityCollectionService<Profile>;

  get type() {
    return this.profileForm.get('type');
  }

  get subtype() {
    return this.profileForm.get('subtype');
  }

  get individual() {
    return this.type.value === 0;
  }

  get phoneNumbers(): FormArray {
    return this.profileForm.get('phoneNumbers') as FormArray;
  }

  get locations(): FormArray {
    return this.profileForm.get('locations') as FormArray;
  }

  constructor(private fb: FormBuilder, private es: EntityServices) {
    this.profilesService = es.getEntityCollectionService('Profile');
  }

  ngOnInit() {
    this.profileForm.get('type').valueChanges.subscribe(v => {
      this.subtype.reset();
      this.subtype.updateValueAndValidity();
      this.individualRequiredFields.forEach(f => {
        const control = this.profileForm.get(f);
        control.clearValidators();
        control.setValidators(v === 0 ? [Validators.required] : []);
        control.reset();
        control.updateValueAndValidity();
      });
      this.businessRequiredFields.forEach(f => {
        const control = this.profileForm.get(f);
        control.clearValidators();
        control.setValidators(v !== 0 ? [Validators.required] : []);
        control.reset();
        control.updateValueAndValidity();
      });
    });
  }

  submit() {
    // @tood: populate subtype (bug) && location[].type and location[].title && address.country && profile.company <= companyName when business
    if(this.profileForm.valid) {
      const profile = new Profile(this.profileForm.value);
      this.profilesService.add(profile).subscribe(() => {
        alert('posted');
      });
    }
  }

  locationNumbers(index: number): FormArray {
    return this.locations.at(index).get('phoneNumbers') as FormArray;
  }

  addNumber() {
    this.phoneNumbers.push(this.fb.group({
      type: ['', Validators.required],
      value: ['', Validators.required]
    }));
  }

  addLocationNumber(index: number) {
    this.locationNumbers(index).push(this.fb.group({
      type: ['', Validators.required],
      value: ['', Validators.required]
    }));
  }

  removeLocationNumber(lIndex: number, nIndex: number) {

  }

  addLocation() {
    this.locations.push(this.fb.group({
      address: this.fb.group({
        street1: ['', Validators.required],
        street2: [''],
        street3: [''],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.required]
      }),
      phoneNumbers: this.fb.array([])
    }));
  }

  onSelect(event) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

}
