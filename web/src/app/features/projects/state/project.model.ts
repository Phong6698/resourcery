import {ID} from '@datorama/akita';

export interface Project {
  id: ID;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export function createProject(params: Partial<Project>): Project {
  return {} as Project;
}
