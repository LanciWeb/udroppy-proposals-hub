import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useAuth0 } from '../auth/Auth0Provider';
import { Form, Label, Input, FormGroup, Button } from 'reactstrap';

const AddCommentForm = props => {
  const [comment, setComment] = useState('');
  const { getTokenSilently, user } = useAuth0();

  const onChangeComment = e => {
    setComment(e.target.value);
  };

  const postComment = async () => {
    const { proposalId } = props;
    const token = await getTokenSilently();
    const apiUrl = process.env.API_URL || 'http://localhost:8081';
    try {
      await axios.post(
        apiUrl + `/proposals/${proposalId}/comments`,
        { comment, user },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const sendComment = async () => {
    if (comment) {
      const commentCreated = await postComment();
      if (commentCreated) {
        props.reloadComments();
        setComment('');
      }
    }
  };

  return (
    <section id="comment-form">
      <Form>
        <FormGroup>
          <Label for="comment">Add Comment</Label>
          <Input
            required
            id="comment"
            name="comment"
            type="textarea"
            value={comment}
            onChange={onChangeComment}
          />
        </FormGroup>
        <div className="text-right">
          <Button
            disabled={!comment}
            onClick={sendComment}
            id="submit-comment-button"
            className={`my-2 ${comment ? '' : 'not-allowed'}`}
          >
            Send Comment
          </Button>
        </div>
      </Form>
    </section>
  );
};

AddCommentForm.propTypes = {
  proposalId: PropTypes.string.isRequired,
  reloadComments: PropTypes.func.isRequired
};

export default AddCommentForm;
