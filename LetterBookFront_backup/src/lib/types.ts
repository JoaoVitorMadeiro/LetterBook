export interface Book {
  id: string;
  title: string;
  author: string;
  coverImageId: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatarUrl?: string;
}
