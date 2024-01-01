export interface Person {
  firstname: string;
  lastname: string;
  birthday: string;
  title: string;
  email: string;
  link: {
    linkedin: string;
    bitbucket?: string;
    github: string;
  };
}
