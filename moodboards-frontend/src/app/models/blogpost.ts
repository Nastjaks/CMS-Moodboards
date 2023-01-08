export interface Blogpost {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  thumbnail: Thumbnail;
}

export interface Thumbnail {
  data: Data;
}

export interface Data {
  id: number;
  attributes: Attributes2;
}


export interface Attributes2 {
  name: string;
  alternativeText?: any;
  url: string;
}
