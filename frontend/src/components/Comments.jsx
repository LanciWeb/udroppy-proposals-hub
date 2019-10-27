import React from 'react';
import PropTypes from 'prop-types';
import { useAuth0 } from '../auth/Auth0Provider';
import DeleteCommentButton from './buttons/DeleteCommentButton';

const Comments = props => {
  const { comments, proposalId, reloadComments } = props;
  const { user } = useAuth0();
  const renderComments = comments =>
    comments.map(c => {
      const dateTime = new Date(c.created_at);
      const time = dateTime.toLocaleTimeString();
      const date = dateTime.toLocaleDateString();
      const isCommentOwner = user.sub === c.user.sub;
      const directionClass = isCommentOwner ? 'flex-row-reverse' : 'flex-row';

      return (
        <div className="comment-wrapper mb-3" key={c._id}>
          <div className={`d-flex ${directionClass}`}>
            <div className="comment-owner">
              <img
                height="40"
                alt="profile"
                title={c.user.nickname}
                src={c.user.picture}
                className="image-fluid"
              />
            </div>
            <div className="comment p-2 mx-2 flex-grow">
              <div>
                <span className="nickname h6">{c.user.nickname}</span>
              </div>
              <p className="mb-0 d-inline">
                {!c.isDeleted && c.text}
                {c.isDeleted && (
                  <span className="muted">
                    <i className="fas fa-ban mx-1" />
                    This comment has been removed
                  </span>
                )}
              </p>
              <div className="timestamp">
                {date} - {time}{' '}
                {isCommentOwner && !c.isDeleted && (
                  <DeleteCommentButton
                    proposalId={proposalId}
                    commentId={c._id}
                    reloadComments={reloadComments}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      );
    });

  return (
    <div id="comments-wrapper" className="p-4">
      {renderComments(comments)}
    </div>
  );
};

Comments.propTypes = {
  proposalId: PropTypes.string.isRequired,
  reloadComments: PropTypes.func.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      user: PropTypes.object.isRequired,
      isDeleted: PropTypes.bool.isRequired,
      created_at: PropTypes.string.isRequired
    })
  )
};

export default Comments;
