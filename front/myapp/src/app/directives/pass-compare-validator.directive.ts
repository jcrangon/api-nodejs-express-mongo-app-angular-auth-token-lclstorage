import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export const passCompareValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const pass = control.parent?.get('password');
    const conf = control.parent?.get('confirmPassword');
     return pass && conf && pass.value !== conf.value ? { passCompare: true} : null;
};
