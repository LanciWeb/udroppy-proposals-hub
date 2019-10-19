import axios from 'axios';
import {
  Row,
  Col,
  Card,
  CardText,
  CardBody,
  CardTitle,
  Container,
  CardHeader,
  CardFooter
} from 'reactstrap';
import Loader from './Loader';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [proposals, setProposals] = useState(null);

  // fetches proposals at mount
  useEffect(() => {
    async function fetchProposals() {
      const response = await axios.get('http://localhost:8081/proposals');
      const proposals = response.data;
      setProposals(proposals);
    }
    fetchProposals();
  }, []);

  const renderProposals = () =>
    proposals.map(p => (
      <Col md="4" lg="3" key={p._id}>
        <Link to={`/proposals/${p._id}`}>
          <Card className="text-white bg-success mb-3">
            <CardHeader>Likes: {p.likes}</CardHeader>
            <CardBody>
              <CardTitle>{p.what}</CardTitle>
              <CardText>{p.who}</CardText>
              <CardText>{p.why}</CardText>
            </CardBody>
            <CardFooter>{p.proposer}</CardFooter>
          </Card>
        </Link>
      </Col>
    ));

  return (
    <Container>
      <Row>
        {proposals === null && <Loader />}
        {proposals && renderProposals()}
      </Row>
    </Container>
  );
}
