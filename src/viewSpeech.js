import React, { useEffect, useReducer } from "react";
import { Button, Modal, Table, Icon } from "semantic-ui-react";
import { Grid, Row, Col } from 'react-flexbox-grid';
import EditSpeech from './editSpeech';
import SearchSpeech from './searchSpeech';

export default function ViewSpeech(props) {
  const viewSpeechReducer = (state, action) => {
    switch (action.type) {
      case 'SET_SPEECHES':
        return { ...state, allSpeeches: action.value }
      case 'REFRESH_LOCAL_STORAGE':
        return { ...state, refreshLocalStorage: !state.refreshLocalStorage }
      default:
        throw new Error(`no such action  :: ${action.type}`)
    }
  }
  const [state, dispatch] = useReducer(viewSpeechReducer, {
    allSpeeches: [],
    refreshLocalStorage: false,
    showSpeech: false,
  });
  const refreshLocalStorage = () => dispatch({ type: 'REFRESH_LOCAL_STORAGE' });
  const setSpeech = (value) => dispatch({ type: 'SET_SPEECHES', value });
  const fetchFromLocalStorage = () => dispatch({ type: 'SET_SPEECHES', value: Object.keys(localStorage).map(el => JSON.parse(localStorage[el])) });
  const deleteHandler = id => {
    localStorage.removeItem(id);
    dispatch({ type: 'REFRESH_LOCAL_STORAGE' });
  }
  useEffect(() => {
    fetchFromLocalStorage();
  }, [state.refreshLocalStorage]);
  useEffect(() => {
    fetchFromLocalStorage();
  }, []);
  return (
    <React.Fragment>
      <Modal
        open={props.showViewSpeech}
        trigger={
          <Button
            data-tut="tour__viewSpeech"
            content="View Speeches"
            onClick={() => props.showViewSpeechHandler(true)}
          />
        }
      >
        <Modal.Header>
          <Grid fluid>
            <Row>
              <Col xs={6} md={4}>
              </Col>
              <Col xs={6} md={6}>
                View All Speeches
              </Col>
              <Col xs={6} md={2}>
                <Icon style={{ "float": "right" }} name='close' onClick={() => props.showViewSpeechHandler(false)} />
              </Col>
            </Row>
            <Row>
              <Col xs={6} md={2}>
              </Col>
              <Col xs={6} md={8}>
                <SearchSpeech setSpeech={setSpeech} />
              </Col>
            </Row>
          </Grid>
        </Modal.Header>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Author</Table.HeaderCell>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Keyword</Table.HeaderCell>
              <Table.HeaderCell>Speech</Table.HeaderCell>
              <Table.HeaderCell>Edit</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              state.allSpeeches && state.allSpeeches.length > 0 && state.allSpeeches.map(({ title,
                speech,
                author,
                id,
                keyword }) => (
                  <Table.Row key={id}>
                    <Table.Cell>{author}</Table.Cell>
                    <Table.Cell>{title}</Table.Cell>
                    <Table.Cell>{keyword}</Table.Cell>
                    <Table.Cell>{speech}</Table.Cell>
                    <Table.Cell><EditSpeech refreshLocalStorage={refreshLocalStorage} id={id} /></Table.Cell>
                    <Table.Cell><Button content="Delete" onClick={() => deleteHandler(id)} /></Table.Cell>
                  </Table.Row>
                ))
            }
          </Table.Body>
        </Table>
      </Modal>
    </React.Fragment>
  );
}
