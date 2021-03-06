import { action, computed, get, observable, remove, set } from "mobx";
import { IHasManualValidation, IManualEntityValidator, PropertyName, ValidationErrors } from "./types";

/** Entity validator implementation acting as a simple validation errors list that needs to be manually maintained */
export default class ManualEntityValidator<TTarget> implements IManualEntityValidator<TTarget> {
  @observable isErrorsVisible: boolean;
  @observable errors: ValidationErrors<TTarget> = {};

  constructor(isErrorsVisible: boolean) {
    this.isErrorsVisible = isErrorsVisible;
  }

  @action
  clearErrors() {
    Object.keys(this.errors).forEach(prop => remove(this.errors, prop));
  }

  @action
  addError(propertyName: PropertyName<TTarget>, message: string) {
    set(this.errors, propertyName, message);
  }

  @action
  removeError(propertyName: PropertyName<TTarget>) {
    remove(this.errors, propertyName);
  }

  @computed get isValid() {
    return Object.keys(this.errors).every(prop => !get(this.errors, prop));
  }
}

export function hasManualEntityValidator<TTarget>(target: any): target is IHasManualValidation<TTarget> {
  return (
    !!target &&
    (target as IHasManualValidation<TTarget>).__validation !== undefined &&
    typeof (target as IHasManualValidation<TTarget>).__validation.addError === "function"
  );
}

export function clearErrors<TTarget>(target: TTarget) {
  if (hasManualEntityValidator<TTarget>(target)) {
    target.__validation.clearErrors();
  }
}

export function addError<TTarget>(target: TTarget, propertyName: PropertyName<TTarget>, message: string) {
  if (hasManualEntityValidator<TTarget>(target)) {
    target.__validation.addError(propertyName, message);
  }
}

export function removeError<TTarget>(target: TTarget, propertyName: PropertyName<TTarget>) {
  if (hasManualEntityValidator<TTarget>(target)) {
    target.__validation.removeError(propertyName);
  }
}
