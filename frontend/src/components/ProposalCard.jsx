import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useAuth0 } from '../auth/Auth0Provider';
import DeleteProposalButton from './buttons/DeleteProposalButton';
import { Card, CardText, CardBody, CardFooter, CardHeader } from 'reactstrap';

const ProposalCard = props => {
  const { proposal } = props;
  const { user, getTokenSilently } = useAuth0();
  const [likes, setLikes] = useState(undefined);

  const isProposalOwner = proposal.user.sub === user.sub;

  const incrementLike = async () => {
    if (isProposalOwner) return;

    const { _id } = proposal;
    const token = await getTokenSilently();
    const apiUrl = process.env.API_URL || 'http://localhost:8081';
    const result = await axios.patch(apiUrl + `/proposals/${_id}/like`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const likes = result.data.likes;
    setLikes(likes);
  };

  return (
    <Card className="proposal text-dark mb-4 h-100">
      <CardHeader className="d-flex justify-content-between">
        <span className="h5">{proposal.title}</span>
        <span className={`d-flex align-items-center`}>
          <span>{likes || proposal.likes}</span>
          <i
            className={`fas fa-thumbs-up ml-2 ${
              isProposalOwner ? 'not-allowed' : 'clickable'
            }`}
            onClick={incrementLike}
          />
        </span>
      </CardHeader>
      <CardBody>
        <CardText>
          <em>
            <strong>Who: </strong>
          </em>
          {proposal.who}
        </CardText>
        <CardText>
          <em>
            <strong>What: </strong>
          </em>
          {proposal.what}
        </CardText>
        <CardText>
          <em>
            <strong>Why </strong>
          </em>
          {proposal.why}
        </CardText>
      </CardBody>
      <CardFooter className="d-flex justify-content-between align-items-center">
        <span>
          {isProposalOwner && (
            <DeleteProposalButton
              proposal={proposal}
              reloadProposals={props.reloadProposals}
            />
          )}
          <Link to={'/'}>
            <i className={`fas fa-comments mr-2`} />
          </Link>
          <span>0</span>
        </span>
        <span>
          <em>Proposed by: </em>
          {proposal.user.picture && (
            <img
              height="40"
              alt="profile"
              src={proposal.user.picture}
              className="image-fluid mr-1"
            />
          )}
          {proposal.user.nickname}
        </span>
      </CardFooter>
    </Card>
  );
};

ProposalCard.propTypes = {
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

export default ProposalCard;
