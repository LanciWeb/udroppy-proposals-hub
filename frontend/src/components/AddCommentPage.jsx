import {
  Row,
  Col,
  Card,
  Container,
  CardHeader,
  CardBody,
  CardFooter
} from 'reactstrap';
import axios from 'axios';
import Loader from './Loader';
import { useAuth0 } from '../auth/Auth0Provider';
import React, { useState, useEffect } from 'react';

const AddCommentPage = props => {
  const { getTokenSilently } = useAuth0();
  const [proposal, setProposal] = useState();

  const getProposal = async () => {
    const params = props.match.params;
    const token = await getTokenSilently();
    const apiUrl = process.env.API_URL || 'http://localhost:8081';
    const response = await axios.get(
      apiUrl + '/proposals/' + params.questionId,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    const proposal = response.data;
    setProposal(proposal);
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
          <Card>
            <CardHeader>Add Comment to [Proposal Title]</CardHeader>
            <CardBody>ALL other fields all other comments</CardBody>
            <CardFooter>textarea with comment forms</CardFooter>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddCommentPage;
