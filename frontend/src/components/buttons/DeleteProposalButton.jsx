import axios from 'axios';
import Loader from './../Loader';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useAuth0 } from './../../auth/Auth0Provider';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const DeleteProposalButton = props => {
  const { getTokenSilently } = useAuth0();
  const { title, _id } = props.proposal;
  const toggle = () => setModal(!modal);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteProposal = async () => {
    setLoading(true);
    const token = await getTokenSilently();
    const apiUrl = process.env.API_URL || 'http://localhost:8081';
    try {
      await axios.delete(apiUrl + `/proposals/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (e) {
      alert(e);
    } finally {
      props.reloadProposals();
      setLoading(false);
      setModal(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <span>
      <i
        className="fa fa-times text-danger clickable"
        onClick={() => setModal(true)}
      />{' '}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Remove Proposal</ModalHeader>
        <ModalBody>
          <h6>{title}</h6>
          Do you want to remove this proposal?
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" className="rounded-button" onClick={toggle}>
            Cancel
          </Button>
          <Button
            color="danger"
            className="rounded-button"
            onClick={deleteProposal}
          >
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </span>
  );
};

DeleteProposalButton.propTypes = {
  proposal: PropTypes.shape({
    _id: PropTypes.string,
    who: PropTypes.string,
    why: PropTypes.string,
    what: PropTypes.string,
    user: PropTypes.object,
    likes: PropTypes.number
  }),
  reloadProposals: PropTypes.func
};

export default DeleteProposalButton;
