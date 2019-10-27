import React from 'react';
import PropTypes from 'prop-types';

const Comments = props => {
  return <div></div>;
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
