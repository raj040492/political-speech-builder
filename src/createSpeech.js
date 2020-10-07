import React, { useEffect, useReducer } from "react";
import { Input, Form, Button, TextArea, Modal, Icon } from "semantic-ui-react";
import { Grid, Row, Col } from 'react-flexbox-grid';

export default function CreateSpeech(props) {
  const createSpeechReducer = (state, action) => {
    switch (action.type) {
      case "SET_TITLE":
        return { ...state, title: action.value };
      case "SET_AUTHOR":
        return { ...state, author: action.value };
      case "SET_KEYWORD":
        return { ...state, keyword: action.value };
      case "SET_SPEECH":
        return { ...state, speech: action.value };
      case "DISABLE_SUBMIT":
        return { ...state, disableSubmit: action.value };
      case "FORM_SUBMITTED":
        return { ...state, formSubmitted: action.value };
      case "HIDE_SUBMITTED_MODAL":
        return { ...state, formSubmitted: false }
      default:
        throw new Error(`No such action.. ${action.type}`);
    }
  };
  const [state, dispatch] = useReducer(createSpeechReducer, {
    title: "",
    author: "",
    keyword: "",
    speech: "",
    disableSubmit: true,
    formSubmitted: false
  });
  const { title, speech, author, keyword } = state;
  const formSubmissionHandler = () => {
    const id = localStorage.length + 1;
    localStorage.setItem(id, JSON.stringify({
      title,
      speech,
      author,
      keyword,
      id
    }));
    props.showCreateSpeechHandler(false);
    dispatch({ type: "FORM_SUBMITTED", value: true });
  };
  useEffect(() => {
    if (state.title && state.speech && state.author && state.keyword) {
      dispatch({ type: "DISABLE_SUBMIT", value: false });
    } else {
      dispatch({ type: "DISABLE_SUBMIT", value: true });
    }
    if (state.formSubmitted) {
      setTimeout(() => {
        dispatch({ type: "FORM_SUBMITTED", value: false });
      }, 2000);
    }
  }, [state.title, state.speech, state.author, state.keyword, state.formSubmitted]);
  return (
    <React.Fragment>
      <Modal
        open={props.showCreateSpeech}
      >
        <Modal.Header>Create Your Speech</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Form>
              <Form.Field>
                <label>Title</label>
                <Input
                  placeholder="Enter title"
                  data-tut="tour_AddTitle"
                  value={state.title}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_TITLE",
                      value: e.target.value
                    })
                  }
                />
              </Form.Field>
              <Form.Field>
                <label>Author</label>
                <Input
                  placeholder="Enter Author"
                  data-tut="tour_AddAuthor"
                  value={state.author}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_AUTHOR",
                      value: e.target.value
                    })
                  }
                />
              </Form.Field>
              <Form.Field>
                <label>Keywords</label>
                <Input
                  data-tut="tour_AddKeyword"
                  placeholder="Please separate keywords with comma"
                  value={state.keyword}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_KEYWORD",
                      value: e.target.value
                    })
                  }
                />
              </Form.Field>
              <Form.Field>
                <label>Speech</label>
                <TextArea
                  data-tut="tour_AddSpeech"
                  placeholder="Your speech goes here..."
                  value={state.speech}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_SPEECH",
                      value: e.target.value
                    })
                  }
                />
              </Form.Field>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            disabled={state.disableSubmit}
            content="Submit"
            onClick={formSubmissionHandler}
            positive
          />
          <Button
            content="Cancel"
            color="black"
            onClick={(e) => props.showCreateSpeechHandler(false)}
          />
        </Modal.Actions>
      </Modal>

      <Modal open={state.formSubmitted}>
        <Modal.Header>
          <Grid fluid>
            <Row>
              <Col xs={6} md={4}>
                Form Submitted
              </Col>
              <Col xs={6} md={6}>
              </Col>
              <Col xs={6} md={2}>
                <Icon style={{ "float": "right" }} name='close' onClick={() => dispatch({ type: 'HIDE_SUBMITTED_MODAL' })} />
              </Col>
            </Row>
          </Grid>
        </Modal.Header>
      </Modal>
      <Button
        data-tut="tour__createSpeech"
        onClick={(e) => props.showCreateSpeechHandler(true)}
        type="submit"
      >
        Create speech
      </Button>
    </React.Fragment>
  );
}
