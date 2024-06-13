import React from "react";
import PropTypes from "prop-types";
import PostPreviewCard from "components/PostPreviewCard";
import PostPreviewListItem from "components/PostPreviewListItem";
import feedTypes from "constants/feedTypes";

function PostList({ posts, cardType, feedType }) {

  switch (feedType) {
    case feedTypes.simpleList:
      return (
        <section className="sm:grid grid-cols-1 gap-2 mt-4">
          {posts.map((article) => (
            <PostPreviewListItem
              className="col-span-1"
              postMeta={article}
              key={article.slug}
              cardType={cardType}
              feedType={feedType}
            />
          ))}
        </section>
      )
    case feedTypes.imageGrid:
      return (
        <section className="sm:grid grid-cols-2 gap-6 mt-4">
          {posts.map((article) => (
            <PostPreviewCard
              className="col-span-1"
              postMeta={article}
              key={article.slug}
              cardType={cardType}
              feedType={feedType}
            />
          ))}
        </section>
      )
    default:
      break;
  }
}

export default PostList;

PostList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  posts: PropTypes.array.isRequired,
  cardType: PropTypes.string.isRequired,
  feedType: PropTypes.string.isRequired
};
