import { Post } from './post';
import { ExtraItem } from './extra';
import { Person } from './person';

export interface ResumeData {
  person: Person;
  work: {
    title: string;
    experiences: Post[];
  }
  education: {
    title: string;
    schools: Post[];
  }
  extra: {
    title: string;
    items: ExtraItem[];
  }
}