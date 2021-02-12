export interface Posts {
  nextToken?: any;
}

export interface Item {
  id: string;
  name: string;
  posts: Posts;
  createdAt: Date;
  updatedAt: Date;
}

export interface ListBlogs {
  items: Item[];
  nextToken?: any;
}

export interface RootObject {
  listBlogs: ListBlogs;
}
