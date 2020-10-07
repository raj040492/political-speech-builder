import React, { useReducer } from "react";
import { Input, Dropdown } from 'semantic-ui-react'

export default function SearchSpeech(props) {
  const dropDownOptions = ['title', 'author', 'speech', 'keyword'];
  const searchReducer = (state, action) => {
    switch (action.type) {
      case "SEARCH_BY":
        return { ...state, searchBy: action.value }
      case "SEARCH_TEXT":
        return { ...state, searchText: action.value }
      default:
        throw new Error(`No such action :: ${action.type}`)
    }
  }
  const [state, dispatch] = useReducer(searchReducer, {
    searchText: '',
    placeholder: 'Search by Title',
    searchBy: 'title'
  });
  const inputChangeHandler = (e) => {
    dispatch({ type: "SEARCH_TEXT", value: e.target.value });
    const filteredFromLocalStorage = Object.keys(localStorage).filter(el => {
      return JSON.parse(localStorage[el]) &&
        JSON.parse(localStorage[el])[state.searchBy] &&
        JSON.parse(localStorage[el])[state.searchBy].toLowerCase().includes(e.target.value.toLowerCase())
    });
    props.setSpeech(filteredFromLocalStorage.map(key => JSON.parse(localStorage.getItem(key))));
  }
  return (
    <React.Fragment>
      <Input
        data-tut="tour__searchBy"
        onChange={inputChangeHandler}
        value={state.searchText}
        placeholder={`Search by ${state.searchBy}`} />
      <Dropdown
        selection
        data-tut="tour__criteria"
        placeholder="Filter By"
        onChange={(e, data) => dispatch({ type: 'SEARCH_BY', value: data.value })}
        options={dropDownOptions.map(el => ({ 'key': el, 'text': `Filter By ${el}`, 'value': el }))}
      />
    </React.Fragment>
  )
}