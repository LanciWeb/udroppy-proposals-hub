import axios from 'axios';
import Loader from './Loader';
import ProposalCard from './ProposalCard';
import { Row, Col, Container } from 'reactstrap';
import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [proposals, setProposals] = useState(null);

  // fetches proposals at mount
  useEffect(() => {
    async function fetchProposals() {
      const apiUrl = process.env.API_URL || 'http://localhost:8081';
      const response = await axios.get(apiUrl + '/proposals');
      const proposals = response.data;
      setProposals(proposals);
    }
    fetchProposals();
  }, []);

  const renderProposals = () =>
    proposals.map(p => (
      <Col sm="6" lg="4" key={p._id}>
        <ProposalCard proposal={p} />
      </Col>
    ));

  return (
    <Container fluid>
      <Row>
        {proposals === null && <Loader />}
        {proposals && renderProposals()}
      </Row>
    </Container>
  );
}
