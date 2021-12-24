export default class LineSegment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;

  constructor(coordsStr: string) {
    const [xy1, xy2] = coordsStr.split(" -> ");
    [this.x1, this.y1] = this.parseToInts(xy1);
    [this.x2, this.y2] = this.parseToInts(xy2);
  
  }

  length(): number {
    return Math.abs(this.x1 - this.x2) + 1;
  }

  slopeIsPositive(): boolean {
    const slope = (this.y1 - this.y2) / (this.x1 - this.x2);
    return slope > 0;
  }

  isDiagonal(): boolean {
    return (this.x1 !== this.x2) && (this.y1 !== this.y2);
  }

  parseToInts(coordsStr: string): number[] {
    return coordsStr.split(",").map(el => parseInt(el));
  }

  getEdgesOfNonSharedCoord(): number[] {
    if (this.isDiagonal()) {
      return [undefined, undefined]
    }
    return this.hasSharedX()
      ? this.getHiLoYs()
      : this.getHiLoXs();
  }

  hasSharedX(): boolean {
    return this.x1 === this.x2;
  }

  getHiLoXs(): number[] {
    return this.getHiLo(this.x1, this.x2);
  }

  getHiLoYs(): number[] {
    return this.getHiLo(this.y1, this.y2);
  }

  getHiLo(coord1: number, coord2: number): number[] {
    return [Math.max(coord1, coord2), Math.min(coord1, coord2)];
  }
}
