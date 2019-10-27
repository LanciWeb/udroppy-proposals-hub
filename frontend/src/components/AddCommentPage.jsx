import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  Container,
  CardHeader,
  CardFooter
} from 'reactstrap';
import axios from 'axios';
import Loader from './Loader';
import Comments from './Comments';
import AddCommentForm from './AddCommentForm';
import { useAuth0 } from '../auth/Auth0Provider';
import React, { useState, useEffect } from 'react';

const AddCommentPage = props => {
  const { getTokenSilently } = useAuth0();
  const [proposal, setProposal] = useState();
  const [comments, setComments] = useState([]);
  const proposalId = props.match.params.id;
  const apiUrl = process.env.API_URL || 'http://localhost:8081';

  const getProposal = async () => {
    const token = await getTokenSilently();
    const response = await axios.get(apiUrl + '/proposals/' + proposalId, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const proposal = response.data;
    setProposal(proposal);
    setComments(proposal.comments);
  };

  const getProposalComments = async () => {
    const token = await getTokenSilently();
    const response = await axios.get(
      apiUrl + `/proposals/${proposalId}/comments`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    const reloadedComments = response.data;
    return reloadedComments;
  };

  const reloadComments = async () => {
    const reloadedComments = await getProposalComments();
    setComments(reloadedComments);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getProposal();
  }, []);

  if (!proposal) return <Loader />;

  return (
    <Container>
      <Row>
        <Col>
          <Card className="h-100">
            <CardHeader>
              <h3>{proposal.title}</h3>
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
              <em>
                <em>
                  <strong>Why </strong>
                </em>
                {proposal.why}
              </em>
              <hr />
              <section id="comments-section">
                <h6>Comments:</h6>
                <Comments comments={comments} />
              </section>
            </CardBody>
            <CardFooter>
              <AddCommentForm
                proposalId={proposalId}
                reloadComments={reloadComments}
              />
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddCommentPage;
