export interface Filter {
  strictDependency: boolean;
  dependency?: Dependency[] | null;
  fields?: string[];
  params?: string[] | null;
}

export interface Range {
  from: number | Date | null;
  to: number | Date | null;
}

export interface Dependency {
  field: string;
  param: boolean | number | string | Date | Range | null;
  fullEntry?: boolean;
}
