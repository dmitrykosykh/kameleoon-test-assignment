import React from 'react';
import './Search.css';
import PropTypes from 'prop-types';

function Search(props) {
  return <input type="text" className="search-component" value={props.filterText} onChange={props.handleChangeFilterText} />;
}

Search.propTypes = {
  filterText: PropTypes.string,
  handleChangeFilterText: PropTypes.func,
};

Search.defaultProps = {
  filterText: '',
  handleChangeFilterText: () => undefined,
};

export default Search;
