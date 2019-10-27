import React from 'react';
import PropTypes from 'prop-types';

const Comments = props => {
  const { comments } = props;

  const renderComments = comments =>
    comments.map(c => (
      <div className="comment-wrapper">
        <div className="comment-owner">
          <img
            height="40"
            alt="profile"
            src={c.user.picture}
            className="image-fluid mr-1"
          />
          {c.user.nickname} -{' '}
          {/* <em>{c.created_at.toLocaleTimeString()}</em> */}
        </div>
        <div className="comment">
          <p>{c.text}</p>
        </div>
      </div>
    ));

  return <div id="comments-wrapper">{renderComments(comments)}</div>;
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      user: PropTypes.object.isRequired,
      created_at: PropTypes.instanceOf(Date)
    })
  )
};

export default Comments;
