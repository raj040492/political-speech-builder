import React, { useEffect, useReducer } from "react";
import $ from "jquery";
import CreateSpeech from "./createSpeech";
import ViewSpeech from "./viewSpeech";
import Tour from "reactour";
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Button } from "semantic-ui-react";

function App() {
  useEffect(() => {
    $(".title").hide().fadeIn(3000);
  }, [])
  const appReducer = (state, action) => {
    switch (action.type) {
      case 'TOGGLE_TOUR_GUIDE':
        return { ...state, isTourOpen: action.value }
      case 'TOGGLE_CREATE_SPEECH_MODAL':
        return { ...state, showCreateSpeech: action.value }
      case 'TOGGLE_VIEW_SPEECH_MODAL':
        return { ...state, showViewSpeech: action.value }
      default:
        throw new Error(`Action not available  : ${action.type}`)
    }
  };
  const showCreateSpeechHandler = (value) => {
    dispatch({ type: 'TOGGLE_CREATE_SPEECH_MODAL', value })
  };
  const showViewSpeechHandler = (value) => {
    dispatch({ type: 'TOGGLE_VIEW_SPEECH_MODAL', value })
  };
  const [state, dispatch] = useReducer(appReducer, {
    isTourOpen: false,
    showCreateSpeech: false,
    showViewSpeech: false
  });
  const closeAllModals = () => {
    dispatch({ type: 'TOGGLE_TOUR_GUIDE', value: false });
    dispatch({ type: 'TOGGLE_CREATE_SPEECH_MODAL', value: false });
    dispatch({ type: 'TOGGLE_VIEW_SPEECH_MODAL', value: false });
  }
  const tourConfig = [
    {
      selector: '[data-tut="tour__createSpeech"]',
      content: ({ goTo }) => (
        <React.Fragment>
          <div>You can use this to create your speeches.</div>
          <hr />
          <div>Click
            <Button
              content="here"
              onClick={() => {
                showCreateSpeechHandler(true);
                goTo(2)
              }}
            />
            to see the create speech modal</div>
        </React.Fragment>
      )
    },
    {
      selector: '[data-tut="tour__viewSpeech"]',
      content: ({ goTo }) => (
        <React.Fragment>
          <div>You can use this to access the created speeches.</div>
          <hr />
          <div>Click
            <Button
              content="here"
              onClick={() => {
                showViewSpeechHandler(true);
                goTo(6)
              }}
            />
            to see the create speech modal</div>
        </React.Fragment>
      )
    },
    {
      selector: '[data-tut="tour_AddTitle"]',
      content: `You can add title of your speech here`
    },
    {
      selector: '[data-tut="tour_AddAuthor"]',
      content: `You can add author of your speech here`
    },
    {
      selector: '[data-tut="tour_AddKeyword"]',
      content: `You can add keyword of your speech here`
    },
    {
      selector: '[data-tut="tour_AddSpeech"]',
      content: ({ goTo }) => (
        <React.Fragment>
          <div>You speech goes here.</div>
          <div>Click
            <Button
              content="here"
              onClick={() => {
                showViewSpeechHandler(true);
                goTo(6)
              }}
            />
            to see the create speech modal</div>
        </React.Fragment>
      )
    },
    {
      selector: '[data-tut="tour__searchBy"]',
      content: ({ goTo }) => (
        <React.Fragment>
          <div>You can use this to input box to search your speeches.</div>
        </React.Fragment>
      )
    },
    {
      selector: '[data-tut="tour__criteria"]',
      content: "Use this dropdown to change your filter criteria"
    }
  ];
  return (
    <React.Fragment>
      <Grid fluid>
        <Row>
          <Col xs={6} md={4}></Col>
          <Col xs={6} md={5}>
            <h1 className="title">Speech Manager</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={6} md={4}>
          </Col>
          <Col xs={6} md={4}>
            <CreateSpeech
              showCreateSpeechHandler={showCreateSpeechHandler}
              showCreateSpeech={state.showCreateSpeech}
            />
            <ViewSpeech
              showViewSpeech={state.showViewSpeech}
              showViewSpeechHandler={showViewSpeechHandler}
            />
            <Tour
              isOpen={state.isTourOpen}
              steps={tourConfig}
              onRequestClose={closeAllModals}
              rounded={5}
              accentColor={`#5cb7b7`}
            />
            <Button onClick={() => dispatch({ type: 'TOGGLE_TOUR_GUIDE', value: true })}>Start Tour</Button>
          </Col>
        </Row>
      </Grid>
    </React.Fragment >
  );
}

export default App;
