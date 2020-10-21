export interface User {
  uid: string;
  email: string;
  name: string;
  username: string;
}

export interface Info {
  username?: string,
  email?: string,
  name?: string,
  tagline?: string,
  statement?: string,
  profilePic?: string
}

export interface Education {
  schoolName?: string,
  qualification?: string,
  highlights?: string
}

export interface Portfolio {
  projectName?: string,
  description?: string,
  skills?: Array<string>,
  link?: string
}

export interface Experience {
  companyName?: string,
  position?: string,
  description?: string,
  skills?: Array<string>
}

export interface UserData {
  info?: Info,
  education?: Array<Education>,
  portfolio?: Array<Portfolio>,
  experience?: Array<Experience>
}