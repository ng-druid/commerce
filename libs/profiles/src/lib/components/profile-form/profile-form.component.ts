import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, RequiredValidator, FormArray } from '@angular/forms';
import { Profile, ProfileSubtypes, AdTypes, ProfileTypes } from '../../models/profiles.model';
import { ProfileFormPayload } from '../../models/form.models';

@Component({
  selector: 'classifieds-ui-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit, OnChanges {

  @Input()
  profile: Profile;

  @Input()
  parent: Profile;

  @Output()
  submitted = new EventEmitter<ProfileFormPayload>();

  individualRequiredFields = ['firstName', 'lastName', 'preferredName'];
  businessRequiredFields = ['companyName'];

  orientation = 'horizontal';

  headshot: File;
  logo: File;

  imageTypes = '.png,.jpg,.jpeg,.gif';

  profileForm = this.fb.group({
    type: [ProfileTypes.Company, Validators.required ],
    subtype: ['', Validators.required],
    adspace: ['', Validators.required ],
    parentId: [''],
    firstName: [''],
    lastName: [''],
    middleName: ['' ],
    preferredName: [''],
    title: ['', Validators.required ],
    companyName: [''],
    phoneNumbers: this.fb.array([]),
    locations: this.fb.array([])
  });

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

  get isTypeSelected() {
    return this.profileForm.get('type').value !== undefined && this.profileForm.get('type').value !== '';
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.profileForm.get('type').valueChanges.subscribe(v => {
      this.applyFormRequirments();
    });
    this.applyFormRequirments();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.parent.previousValue !== changes.parent.currentValue) {

      this.profileForm.reset();

      if(this.parent) {
        this.profileForm.get('type').setValue(ProfileTypes.Person);
        this.profileForm.get('adspace').setValue(this.parent.adspace);
        this.profileForm.get('parentId').setValue(this.parent.id);
        this.profileForm.get('parentId').clearValidators();
        this.profileForm.get('parentId').setValidators(this.type.value !== 0 ? [Validators.required] : []);
        switch(this.parent.adspace) {
          case AdTypes.RealEstate:
          case AdTypes.Rental:
            this.profileForm.get('subtype').setValue(ProfileSubtypes.Agent);
            break;
          default:
              this.profileForm.get('subtype').setValue(ProfileSubtypes.Seller);
              break;
        }
      } else {
        this.profileForm.get('adspace').setValue('');
        this.profileForm.get('parentId').setValue('');
        this.profileForm.get('parentId').clearValidators();
        this.profileForm.get('subtype').setValue('');
        this.profileForm.get('type').setValue('');
      }

      this.applyFormRequirments();
    }
  }

  submit() {
    if(this.profileForm.valid) {
      this.submitted.emit(new ProfileFormPayload({ profile: new Profile(this.profileForm.value), logo: this.logo, headshot: this.headshot }));
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
        zip: ['', Validators.required],
        country: ['us', Validators.required]
      }),
      title: ['', Validators.required],
      type: [1, Validators.required],
      phoneNumbers: this.fb.array([])
    }));
  }

  onSelectLogo(event) {
    this.logo = event.addedFiles[0];
  }

  onSelectHeadshot(event) {
    this.headshot = event.addedFiles[0];
  }

  onRemoveLogo(event) {
    this.logo = undefined;
  }

  onRemoveHeadshot(event) {
    this.headshot = undefined;
  }

  applyFormRequirments() {
    this.individualRequiredFields.forEach(f => {
      const control = this.profileForm.get(f);
      control.clearValidators();
      control.setValidators(this.type.value === 0 ? [Validators.required] : []);
      control.reset();
      control.updateValueAndValidity();
    });
    this.businessRequiredFields.forEach(f => {
      const control = this.profileForm.get(f);
      control.clearValidators();
      control.setValidators(this.type.value !== 0 ? [Validators.required] : []);
      control.reset();
      control.updateValueAndValidity();
    });
    this.profileForm.updateValueAndValidity();
  }

}
