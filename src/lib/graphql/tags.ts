import gql from 'graphql-tag';

export type Tag = {
  id: string;
  name: string;
  description: string | null;
  thumbnail: string | null;
  posts_count: number;
};

export const GET_TAGS = gql`
  query Tags($sort: String!, $cursor: ID, $limit: Int) {
    tags(sort: $sort, cursor: $cursor, limit: $limit) {
      id
      name
      description
      posts_count
      thumbnail
    }
  }
`;

export const GET_TAG = gql`
  query Tag($name: String!) {
    tag(name: $name) {
      id
      name
      description
      posts_count
      thumbnail
    }
  }
`;

export type GetTagsResponse = {
  tags: Tag[];
};

export type GetTagResponse = {
  tag: Tag;
};
