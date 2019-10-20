import axios from 'axios';
import Loader from './Loader';
import { Link } from 'react-router-dom';
import ProposalCard from './ProposalCard';
import { Row, Col, Container } from 'reactstrap';
import { useAuth0 } from '../auth/Auth0Provider';
import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const { getTokenSilently } = useAuth0();
  const [proposals, setProposals] = useState(null);

  // fetches proposals at mount
  useEffect(() => {
    async function fetchProposals() {
      const token = await getTokenSilently();
      const apiUrl = process.env.API_URL || 'http://localhost:8081';
      const response = await axios.get(apiUrl + '/proposals', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const proposals = response.data;
      setProposals(proposals);
    }
    fetchProposals();
  }, [getTokenSilently]);

  const renderProposals = () =>
    proposals.map(p => (
      <Col sm="6" lg="4" key={p._id} className="mb-4">
        <ProposalCard proposal={p} />
      </Col>
    ));

  return (
    <Container fluid id="dashboard">
      <Row>
        {proposals === null && <Loader />}
        {proposals && renderProposals()}
      </Row>
      <Link to="/propose" className="btn" id="add-propose-button">
        <i className="fas fa-plus fa-2x" />
      </Link>
    </Container>
  );
}
