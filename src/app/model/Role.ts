import {Resource} from './Resource';

export class Role {
  id: number;
  name: string;
  resources?: Array<Resource>;
}
