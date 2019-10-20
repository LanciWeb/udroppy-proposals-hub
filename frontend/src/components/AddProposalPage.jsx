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

const AddProposalPage = () => {
  const [disabled, setDisabled] = useState(false);

  const updateValue = e => {};

  const submitProposal = () => {};

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
                  type="text"
                  name="title"
                  id="title"
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
                <Input type="text" name="who" id="who" onBlur={updateValue} />
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
                className="btn my-2"
                onClick={submitProposal}
                id="submit-proposal-button"
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

export default AddProposalPage;
