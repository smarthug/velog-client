import gql from 'graphql-tag';
import { User } from './user';

export type Post = {
  id: string;
  title: string;
  body: string;
  thumbnail: string;
  is_markdown: boolean;
  is_temp: boolean;
  user: any;
  url_slug: string;
  likes: number;
  meta: any;
  views: number;
  is_private: boolean;
  released_at: string;
  created_at: string;
  updated_at: string;
  short_description: string;
  comments: Comment[];
  tags: string[];
  comments_count: number;
};

export interface Comment {
  id: string;
  user: {
    id: string;
    username: string;
    profile: {
      thumbnail: string | null;
    };
  } | null;
  text: string | null;
  replies_count: number;
  replies?: Comment[];
  created_at: string;
  deleted: boolean;
  level: number;
}

// Post Type for PostList
export type PartialPost = {
  id: string;
  title: string;
  short_description: string;
  thumbnail: string;
  user: User;
  url_slug: string;
  is_private: boolean;
  released_at: string;
  tags: string[];
  comments_count: number;
};

// Generated by https://quicktype.io
export type SeriesPost = {
  id: string;
  post: {
    id: string;
    title: string;
    url_slug: string;
    user: {
      id: string;
      username: string;
    };
  };
};

export interface SinglePost {
  id: string;
  title: string;
  released_at: string;
  updated_at: string;
  tags: string[];
  body: string;
  short_description: string;
  is_markdown: boolean;
  is_private: boolean;
  is_temp: boolean;
  thumbnail: string | null;
  url_slug: string;
  user: {
    id: string;
    username: string;
    profile: {
      display_name: string;
      thumbnail: string;
      short_bio: string;
    };
    velog_config: {
      title: string;
    };
  };
  comments: Comment[];
  comments_count: number;
  series: {
    id: string;
    name: string;
    series_posts: SeriesPost[];
  } | null;
}

export interface CommentWithReplies {
  id: string;
  replies: Comment[];
}

export const GET_POST_LIST = gql`
  query Posts($cursor: ID) {
    posts(cursor: $cursor) {
      id
      title
      short_description
      thumbnail
      user {
        id
        username
        profile {
          thumbnail
        }
      }
      url_slug
      released_at
      comments_count
      tags
      is_private
    }
  }
`;

export const READ_POST = gql`
  query ReadPost($username: String, $url_slug: String) {
    post(username: $username, url_slug: $url_slug) {
      id
      title
      released_at
      updated_at
      tags
      body
      short_description
      is_markdown
      is_private
      is_temp
      thumbnail
      comments_count
      url_slug
      user {
        id
        username
        profile {
          display_name
          thumbnail
          short_bio
        }
        velog_config {
          title
        }
      }
      comments {
        id
        user {
          id
          username
          profile {
            thumbnail
          }
        }
        text
        replies_count
        level
        created_at
        level
        deleted
      }
      series {
        id
        name
        series_posts {
          id
          post {
            id
            title
            url_slug
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const GET_COMMENTS_COUNT = gql`
  query GetCommentsCount($id: ID!) {
    post(id: $id) {
      id
      comments_count
    }
  }
`;

export const RELOAD_COMMENTS = gql`
  query ReloadComments($id: ID!) {
    post(id: $id) {
      id
      comments_count
      comments {
        id
        user {
          id
          username
          profile {
            thumbnail
          }
        }
        text
        replies_count
        level
        created_at
        deleted
      }
    }
  }
`;

export const GET_COMMENT = gql`
  query GetComment($id: ID!) {
    comment(comment_id: $id) {
      id
      user {
        id
        username
        profile {
          thumbnail
        }
      }
      text
      replies_count
      level
      created_at
      deleted
    }
  }
`;

export const GET_REPLIES = gql`
  query ReloadReplies($id: ID!) {
    comment(comment_id: $id) {
      id
      replies {
        id
        user {
          id
          username
          profile {
            thumbnail
          }
        }
        text
        replies_count
        created_at
        level
        deleted
      }
    }
  }
`;

export const WRITE_POST = gql`
  mutation WritePost(
    $title: String
    $body: String
    $tags: [String]
    $is_markdown: Boolean
    $is_temp: Boolean
    $url_slug: String
    $thumbnail: String
    $meta: JSON
    $series_id: ID
  ) {
    writePost(
      title: $title
      body: $body
      tags: $tags
      is_markdown: $is_markdown
      is_temp: $is_temp
      url_slug: $url_slug
      thumbnail: $thumbnail
      meta: $meta
      series_id: $series_id
    ) {
      id
      user {
        id
        username
      }
      url_slug
    }
  }
`;

export type WritePostResponse = {
  writePost: {
    id: string;
    user: {
      id: string;
      username: string;
    };
    url_slug: string;
  };
};

export const WRITE_COMMENT = gql`
  mutation WriteComment($post_id: ID!, $text: String!, $comment_id: ID) {
    writeComment(post_id: $post_id, text: $text, comment_id: $comment_id) {
      id
      user {
        id
        username
        profile {
          thumbnail
        }
      }
      text
      replies_count
    }
  }
`;

export const EDIT_COMMENT = gql`
  mutation EditComment($id: ID!, $text: String!) {
    editComment(id: $id, text: $text) {
      id
      text
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation RemoveComment($id: ID!) {
    removeComment(id: $id)
  }
`;

export const REMOVE_POST = gql`
  mutation RemovePost($id: ID!) {
    removePost(id: $id)
  }
`;
