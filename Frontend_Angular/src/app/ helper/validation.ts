import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";
import { VALIDATION_PATTERN } from "./pattern";

export function checkPasswordValidation(
    control: AbstractControl,
  ): ValidationErrors | null {
    if (!control.value?.match(VALIDATION_PATTERN.password)) {
      return { strong_password: true };
    }
    return null;
  }

  export function ConfirmPasswordValidator(
    controlName: string,
    matchingControlName: string,
  ) {
    return (formGroup: FormGroup) => {
      let control = formGroup.controls[controlName];
      let matchingControl = formGroup.controls[matchingControlName];
  
      matchingControl.valueChanges.subscribe(() => {
        if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ confirmPasswordError: true });
        } else {
          matchingControl.setErrors(null); // Clear errors if passwords match
        }
      });
  
      // Initial validation (optional)
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPasswordError: true });
      } 
      return null;
    };
  }