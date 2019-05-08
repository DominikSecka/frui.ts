import NavigationPath from "./navigationPath";

export interface IHasNavigationName {
  readonly navigationName: string;
}

export interface ICanNavigate {
  navigate(path: string): Promise<any>;
  getNavigationPath(item: IHasNavigationName): NavigationPath;
}
