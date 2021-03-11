export interface ISolution {
  id?: number;
  solution?: string;
  bugId?: number;
}

export class Solution implements ISolution {
  constructor(public id?: number, public solution?: string, public bugId?: number) {}
}
