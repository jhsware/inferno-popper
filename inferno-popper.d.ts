declare module "inferno-popper" {
  import * as Inferno from "inferno";
  import * as PopperJS from "popper.js";

  interface IRestProps {
    restProps: {
      [prop: string]: any;
    },
  }

  interface IComponentProps<T> {
    children?: Inferno.InfernoNode | Inferno.SFC<T & IRestProps>;
    component?: Inferno.InfernoType;
    innerRef?: (ref: HTMLElement) => void;
    [prop: string]: any;
  }

  interface IManagerProps {
    tag?: string | boolean;
    [prop: string]: any;
  }

  class Manager extends Inferno.Component<IManagerProps, {}> {
  }

  interface IPopperChildrenProps extends IRestProps {
    popperProps: {
      ref: (ref: HTMLElement) => void;
      style: Inferno.CSSProperties;
      ["data-placement"]: PopperJS.Placement;
    };
    restProps: IRestProps;
    scheduleUpdate: (() => void) | undefined;
  }

  interface IPopperProps extends IComponentProps<IPopperChildrenProps> {
    eventsEnabled?: boolean;
    modifiers?: PopperJS.Modifiers;
    placement?: PopperJS.Placement;
  }

  class Popper extends Inferno.Component<IPopperProps, {}> {
  }

  interface ITargetChildrenProps extends IRestProps {
    targetProps: {
      ref: (ref: HTMLElement) => void;
    }
  }

  class Target extends Inferno.Component<IComponentProps<ITargetChildrenProps>, {}> {
  }

  interface IArrowChildrenProps extends IRestProps {
    arrowProps: {
      ref: (ref: HTMLElement) => void;
      style: Inferno.CSSProperties;
    }
  }

  class Arrow extends Inferno.Component<IComponentProps<IArrowChildrenProps>, {}> {
  }
}