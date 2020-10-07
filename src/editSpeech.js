import React, { useEffect, useReducer } from "react";
import { Button, Modal, Form, Input, TextArea } from "semantic-ui-react";


export default function EditSpeech(props) {
  const editSpeechReducer = (state, action) => {
    switch (action.type) {
      case "SET_TITLE":
        return { ...state, title: action.value };
      case "SET_AUTHOR":
        return { ...state, author: action.value };
      case "SET_KEYWORD":
        return { ...state, keyword: action.value };
      case "SET_SPEECH":
        return { ...state, speech: action.value };
      case 'SHOW_EDIT_FORM':
        return { ...state, showEditForm: true };
      case 'HIDE_EDIT_FORM':
        return { ...state, showEditForm: false };
      case 'FORM_UPDATED':
        return { ...state, formSubmitted: true };
      case 'HIDE_ALL_MODALS':
        return { ...state, formSubmitted: false, showEditForm: false };
      default:
        throw new Error(`Unknown action :: ${action.type}`)
    }
  }
  const [state, dispatch] = useReducer(editSpeechReducer, {
    showEditForm: false,
    title: "",
    author: "",
    keyword: "",
    speech: "",
    formSubmitted: false
  });
  const updateSpeechHandler = () => {
    const { title, speech, author, keyword } = state;
    localStorage.setItem(props.id, JSON.stringify({
      title,
      speech,
      author,
      keyword,
      id: props.id
    }));
    dispatch({ type: "FORM_UPDATED", value: speech });
    // After editing and submitting changes, the View speech modal should show the updated content.
    props.refreshLocalStorage();
  }
  useEffect(() => {
    const { title = '', author = '', keyword = '', speech = '' } = (props.id && JSON.parse(localStorage.getItem(props.id))) || {};
    dispatch({ type: "SET_TITLE", value: title });
    dispatch({ type: "SET_AUTHOR", value: author });
    dispatch({ type: "SET_KEYWORD", value: keyword });
    dispatch({ type: "SET_SPEECH", value: speech });
  }, [props.id])
  return (
    <React.Fragment>
      <Modal
        open={state.showEditForm}
        close={state.formSubmitted}
        trigger={
          <Button
            onClick={() => dispatch({ type: 'SHOW_EDIT_FORM' })}
            content="Edit"
          />
        }
      >
        <Modal.Header>Edit your speech</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Form>
              <Form.Field>
                <label>Title</label>
                <Input
                  placeholder="Enter title"
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
            onClick={updateSpeechHandler}
            positive
          />
          <Button content="Cancel" color="black" onClick={(e) => dispatch({ type: 'HIDE_EDIT_FORM' })} />
        </Modal.Actions>
      </Modal>
      <Modal open={state.formSubmitted}>
        <Modal.Header>Form Submitted</Modal.Header>
        <Button content="Close" onClick={() => dispatch({ type: 'HIDE_ALL_MODALS' })} />
      </Modal>
    </React.Fragment>
  )
}