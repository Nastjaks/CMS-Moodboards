export interface Posting {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  title: string;
  description?: any;
  tag: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  image: Image;
  posting_creator: PostingCreator;
  moodboards: Moodboards;
}

//-----------------------------------------------------
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

export interface Formats {
  thumbnail: Thumbnail;
}

export interface Attributes2 {
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
  attributes: Attributes2;
}

export interface Image {
  data: Data;
}

export interface Attributes3 {
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  description: string;
}

export interface Data2 {
  id: number;
  attributes: Attributes3;
}

export interface PostingCreator {
  data: Data2;
}

export interface Attributes4 {
  title: string;
  description: string;
  private: boolean;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}

export interface Datum {
  id: number;
  attributes: Attributes4;
}

export interface Moodboards {
  data: Datum[];
}



