import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Card, CardText, CardBody, CardFooter, CardHeader } from 'reactstrap';

const ProposalCard = props => {
  const { proposal } = props;
  const [likes, setLikes] = useState(undefined);

  const incrementLike = async () => {
    const { _id } = proposal;
    const apiUrl = process.env.API_URL || 'http://localhost:8081';
    const result = await axios.patch(apiUrl + `/proposals/${_id}/like`);
    const likes = result.data.likes;
    setLikes(likes);
  };

  return (
    <Card className="proposal text-dark mb-3">
      <CardHeader className="d-flex justify-content-between">
        <span>Likes: {likes || proposal.likes}</span>
        <i className="fas fa-thumbs-up" onClick={incrementLike} />
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
