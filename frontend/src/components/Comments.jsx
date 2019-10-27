import React from 'react';
import PropTypes from 'prop-types';
import { useAuth0 } from '../auth/Auth0Provider';

const Comments = props => {
  const { comments } = props;
  const { user } = useAuth0();
  const renderComments = comments =>
    comments.map(c => {
      const dateTime = new Date(c.created_at);
      const time = dateTime.toLocaleTimeString();
      const date = dateTime.toLocaleDateString();
      const directionClass =
        user.sub === c.user.sub ? 'flex-row-reverse' : 'flex-row';

      return (
        <div className="comment-wrapper mb-3" key={c._id}>
          <div className={`d-flex ${directionClass}`}>
            <div className="comment-owner">
              <img
                height="40"
                alt="profile"
                ttle={c.user.nickname}
                src={c.user.picture}
                className="image-fluid "
              />
            </div>
            <div className="comment p-2 mx-2 flex-grow">
              <div>
                <span className="nickname h6">{c.user.nickname}</span>
              </div>
              <p className="mb-0 d-inline">{c.text}</p>
              <div className="timestamp">
                {date} - {time}
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
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      user: PropTypes.object.isRequired,
      created_at: PropTypes.string.isRequired
    })
  )
};

export default Comments;
