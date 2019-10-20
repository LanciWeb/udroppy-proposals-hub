import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useAuth0 } from '../auth/Auth0Provider';
import { Card, CardText, CardBody, CardFooter, CardHeader } from 'reactstrap';

const ProposalCard = props => {
  const { proposal } = props;
  const { getTokenSilently } = useAuth0();
  const [likes, setLikes] = useState(undefined);

  const incrementLike = async () => {
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
        <span className="d-flex align-items-center">
          <span>{likes || proposal.likes}</span>
          <i className="fas fa-thumbs-up ml-2" onClick={incrementLike} />
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
      <CardFooter className="text-right">
        <em>Proposed by: </em>
        {proposal.proposerPic && (
          <img
            height="40"
            alt="profile"
            src={proposal.proposerPic}
            className="image-fluid mr-1"
          />
        )}
        {proposal.proposer}
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
    likes: PropTypes.number,
    proposer: PropTypes.string
  })
};

export default ProposalCard;
