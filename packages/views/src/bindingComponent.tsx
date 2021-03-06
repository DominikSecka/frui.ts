import { ensureObservableProperty } from "@frui.ts/helpers";
import { action, get, isObservable, isObservableProp } from "mobx";
import * as React from "react";

/**
 * Base props required for two-way binding.
 *
 * Every control inehriting [[BindingComponent]] should use props implementing `IBindingProps`
 *
 * @typeparam TTarget Type of the target entity
 */
export interface IBindingProps<TTarget> {
  /** Target entity for the binding. The entity should be Mobx `observable`. */
  target?: TTarget;

  /** Name of the bound property on the target entity */
  property?: keyof TTarget & string;

  /**
   * Event handler called when the value of the control is changed
   *
   * @param value  New value coming from the input control
   * @param property  Name of the bound property on the target entity
   * @param target  The target entity for the binding
   */
  onValueChanged?: (value: any, property: keyof TTarget & string, target: TTarget) => void;
}

export type ExcludeBindingProps<T> = Omit<T, keyof IBindingProps<any>>;

/**
 * Base class for all user input controls supporting two-way binding.
 *
 * You should render your custom user input within `BindingComponent` and then use
 * the functions provided by `BindingComponent` for simple two-way binding:
 * * Use the [[value]] property in the `render` function (together with Mobx `Observer`)
 * to access bound value.
 * * Call [[setValue]] after user input with the new value to update the target entity.
 *
 * @see [[TextBox]] for example
 *
 * @typeparam TTarget Type of the targete entity for binding
 * @typeparam TProps Type of the props. Should implement [[IBindingProps]] with information required for binding.
 */
export abstract class BindingComponent<TTarget, TProps extends IBindingProps<TTarget>> extends React.Component<TProps> {
  /**
   * Returns `props` excluding properties required for binding.
   *
   * This makes it easy to pass the props to the inner user control:
   * ```ts
   * render() {
   *  return <input {...this.inheritedProps} />;
   * }
   * ```
   */
  protected get inheritedProps(): Partial<ExcludeBindingProps<TProps>> {
    const { target, property, onValueChanged, ...otherProps } = this.props;

    return otherProps as ExcludeBindingProps<TProps>;
  }

  /** Returns value of the bound property */
  protected get value() {
    const { target, property } = this.props as IBindingProps<TTarget>;

    if (!target) {
      console.warn("'target' prop has not been set");
      return undefined;
    }
    if (!property) {
      throw new Error("'property' prop has not been set");
    }

    if (!isObservable(target) || !isObservableProp(target, property)) {
      ensureObservableProperty(target, property, target[property]);
    }

    return get(target, property);
  }

  /** Sets the provided value to the bound property  */
  @action.bound
  protected setValue(value: any) {
    const { target, property, onValueChanged } = this.props as IBindingProps<TTarget>;

    if (target && property) {
      ensureObservableProperty(target, property, value);

      if (onValueChanged) {
        onValueChanged(value, property, target);
      }
    }
  }
}
