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
  postings: Postings;
}
/*--------------*/


export interface Thumbnail {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path?: any;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface Large {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path?: any;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface Medium {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path?: any;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface Small {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path?: any;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface Formats {
  thumbnail: Thumbnail;
  large: Large;
  medium: Medium;
  small: Small;
}

export interface Attributes3 {
  name: string;
  alternativeText?: any;
  caption?: any;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: any;
  provider: string;
  provider_metadata?: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface Data {
  id: number;
  attributes: Attributes3;
}

export interface Image {
  data: Data;
}

export interface Attributes2 {
  title: string;
  description: string;
  tag: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  image: Image;
}

export interface Datum {
  id: number;
  attributes: Attributes2;
}

export interface Postings {
  data: Datum[];
}


