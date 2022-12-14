export interface Moodboard {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  title: string;
  description: string;
  private: boolean;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  moodboard_creator: MoodboardCreator;
  postings: Postings;
}


export interface Attributes2 {
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  description: string;
}

export interface Data {
  id: number;
  attributes: Attributes2;
}

export interface MoodboardCreator {
  data: Data;
}

export interface Attributes3 {
  title: string;
  description: string;
  tag: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}

export interface Datum {
  id: number;
  attributes: Attributes3;
}

export interface Postings {
  data: Datum[];
}

