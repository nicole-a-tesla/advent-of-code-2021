export interface Cell {
  x: number;
  y: number;
  number: number;
  called: boolean;
}

export interface Board {
  cells: Cell[];
  won: boolean;
}

