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
import AddCommentForm from './AddCommentForm';
import { useAuth0 } from '../auth/Auth0Provider';
import React, { useState, useEffect } from 'react';

const AddCommentPage = props => {
  const { getTokenSilently } = useAuth0();
  const [proposal, setProposal] = useState();

  const getProposal = async () => {
    const params = props.match.params;
    const token = await getTokenSilently();
    const apiUrl = process.env.API_URL || 'http://localhost:8081';
    const response = await axios.get(apiUrl + '/proposals/' + params.id, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const proposal = response.data;
    setProposal(proposal);
  };

  const reloadComments = () => {
    //TODO add api call to refetch the comments
    alert('reloadComments!');
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
                <div id="comment-wrapper"></div>
              </section>
            </CardBody>
            <CardFooter>
              <AddCommentForm
                proposalId={proposal._id}
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
