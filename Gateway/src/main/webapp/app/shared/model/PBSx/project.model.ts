import { IBug } from 'app/shared/model/PBSx/bug.model';

export interface IProject {
  id?: number;
  title?: string;
  bugs?: IBug[];
}

export class Project implements IProject {
  constructor(public id?: number, public title?: string, public bugs?: IBug[]) {}
}
