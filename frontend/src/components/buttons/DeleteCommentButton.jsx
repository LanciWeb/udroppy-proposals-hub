import axios from 'axios';
import Loader from '../Loader';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useAuth0 } from '../../auth/Auth0Provider';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const DeleteCommentButton = props => {
  const { getTokenSilently } = useAuth0();
  const { commentId, proposalId } = props;
  const toggle = () => setModal(!modal);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteComment = async () => {
    setLoading(true);
    const token = await getTokenSilently();
    const apiUrl = process.env.API_URL || 'http://localhost:8081';
    try {
      await axios.delete(
        apiUrl + `/proposals/${proposalId}/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    } catch (e) {
      alert(e);
    } finally {
      props.reloadComments();
      setLoading(false);
      setModal(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <span>
      <i
        className="fa fa-times text-danger clickable mx-2"
        onClick={() => setModal(true)}
      />{' '}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Remove Comment</ModalHeader>
        <ModalBody>Do you want to remove this comment?</ModalBody>
        <ModalFooter>
          <Button color="secondary" className="rounded-button" onClick={toggle}>
            Cancel
          </Button>
          <Button
            color="danger"
            className="rounded-button"
            onClick={deleteComment}
          >
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </span>
  );
};

DeleteCommentButton.propTypes = {
  commentId: PropTypes.string.isRequired,
  proposalId: PropTypes.string.isRequired,
  reloadComments: PropTypes.func.isRequired
};

export default DeleteCommentButton;
