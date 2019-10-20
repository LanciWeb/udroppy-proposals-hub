import {
  Col,
  Row,
  Card,
  Label,
  Input,
  Button,
  CardBody,
  FormText,
  FormGroup,
  Container,
  CardHeader,
  CardFooter
} from 'reactstrap';
import axios from 'axios';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useAuth0 } from '../auth/Auth0Provider';

const AddProposalPage = props => {
  const initialProposal = {
    title: '',
    who: '',
    what: '',
    why: ''
  };
  const { getTokenSilently, user } = useAuth0();
  const [disabled, setDisabled] = useState(false);
  const [proposal, setProposal] = useState(initialProposal);

  const updateValue = e => {
    const { name, value } = e.target;
    const updatedProposal = { ...proposal, [name]: value };
    setProposal(updatedProposal);
  };

  const validateForm = () => {
    let isValid = true;
    Object.keys(proposal).forEach(k => {
      if (proposal[k] === '') isValid = false;
    });
    return isValid;
  };

  const submitProposal = async () => {
    setDisabled(true);
    const isValid = validateForm();
    if (isValid) {
      await postProposal();
      props.history.push('/');
    }
    setDisabled(false);
    return;
  };

  const postProposal = async () => {
    const token = await getTokenSilently();
    const apiUrl = process.env.API_URL || 'http://localhost:8081';
    await axios.post(
      apiUrl + '/proposals',
      { ...proposal, user },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <h3>New Proposal</h3>
            </CardHeader>
            <CardBody className="text-left">
              <FormGroup>
                <Label for="title" className="h4">
                  Title
                </Label>
                <Input
                  required
                  type="text"
                  id="title"
                  name="title"
                  onBlur={updateValue}
                />
                <FormText color="muted">
                  Add a small title that resumes the proposal
                </FormText>
              </FormGroup>
              <FormGroup>
                <Label for="who" className="h4">
                  Who
                </Label>
                <Input
                  required
                  type="text"
                  name="who"
                  id="who"
                  onBlur={updateValue}
                />
                <FormText color="muted">
                  Specify which kind of user is going to benefit from your
                  proposal.
                  <em className="ml-2">
                    (Affiliates, Ecom Managers, Supplier, Finanacial, Product
                    Manager, Operations, All)
                  </em>
                </FormText>
              </FormGroup>
              <FormGroup>
                <Label for="what" className="h4">
                  What
                </Label>
                <Input
                  rows="5"
                  required
                  id="what"
                  name="what"
                  type="textarea"
                  onBlur={updateValue}
                />
                <FormText color="muted">Describe your idea</FormText>
              </FormGroup>
              <FormGroup>
                <Label for="why" className="h4">
                  Why
                </Label>
                <Input
                  required
                  rows="5"
                  id="why"
                  name="why"
                  type="textarea"
                  onBlur={updateValue}
                />
                <FormText color="muted">
                  Describe the benefits and the business value your idea will
                  produce if implemented.
                </FormText>
              </FormGroup>
            </CardBody>
            <CardFooter className="text-right">
              <Button
                type="button"
                disabled={disabled}
                className="btn  my-2"
                id="submit-proposal-button"
                onClick={submitProposal}
              >
                Submit Proposal
              </Button>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default withRouter(AddProposalPage);
