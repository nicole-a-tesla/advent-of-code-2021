export default class Grid {
  grid: number[][];

  constructor(inputString: string) {
    this.grid = this.generateGrid(inputString)
  }

  increment(x: number, y: number): void {
    this.grid[y][x]++;
  }

  countGreaterThan1s(): number {
    const flatGrid = this.grid.flat();
    return flatGrid.filter(num => num > 1).length;
  }
  
  generateGrid(inputString: string): number[][] {
    const grid = [];
    const coords = inputString.match(/\d+/g);

    if (!coords) {
      return [];
    }

    const coordInts = coords.map(el=>parseInt(el));
    const maxCoord = Math.max(...coordInts);

    for (let x = 0; x <= maxCoord; x++) {
      let row = [];
      for (let y = 0; y <= maxCoord; y++) {
        row.push(0);
      }
      grid.push(row);
    }

    return grid;
  }

  print(): void {
    this.grid.forEach(row => console.log(JSON.stringify(row)));
  }
}
