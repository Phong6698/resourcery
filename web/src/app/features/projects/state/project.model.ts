import {Object} from 'parse';

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ParseProject extends Object<Project>{}

export function createProject(params: Partial<ParseProject>): ParseProject {
  return {} as ParseProject;
}
