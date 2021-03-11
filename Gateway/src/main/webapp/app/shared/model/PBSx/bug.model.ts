import { ISolution } from 'app/shared/model/PBSx/solution.model';

export interface IBug {
  id?: number;
  code?: string;
  state?: string;
  description?: string;
  date?: string;
  dependenceList?: string;
  solutions?: ISolution[];
  projectId?: number;
}

export class Bug implements IBug {
  constructor(
    public id?: number,
    public code?: string,
    public state?: string,
    public description?: string,
    public date?: string,
    public dependenceList?: string,
    public solutions?: ISolution[],
    public projectId?: number
  ) {}
}
