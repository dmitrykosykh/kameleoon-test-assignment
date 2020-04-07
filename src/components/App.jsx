import _ from 'lodash';
import React from 'react';
import Search from './Search';
import SortableTable from './SortableTable';
import './App.css';
import * as api from '../api/api';
import regeneratorRuntime from 'regenerator-runtime';

class App extends React.Component {
  constructor() {
    super();
    this.intervalID = null;
    this.state = {
      tools: [],
      sorting: 'ASC', // ASC or DESC
      filterText: '',
      hoveringToolID: null,
    };
  }

  handleMouseOverToolItem = (toolID) => {
    this.setState({ hoveringToolID: toolID });
  }

  handleChangeFilterText = (event) => {
    this.setState({
      filterText: event.target.value,
    });
  }

  handleClickToggleSorting = () => {
    switch (this.state.sorting) {
      case 'ASC': {
        this.setState((prevState) => ({
          sorting: 'DESC',
          tools: this.sortToolsByDESC(prevState.tools),
        }));
        break;
      }
      case 'DESC': {
        this.setState((prevState) => ({
          sorting: 'ASC',
          tools: this.sortToolsByASC(prevState.tools),
        }));
        break;
      }
      default:
        break;
    }
  }

  sortToolsByASC = (tools) => _.sortBy(tools, (tool) => tool.name)

  sortToolsByDESC = (tools) => _.sortBy(tools, (tool) => tool.name).reverse()

  componentDidMount = () => {
    if (this.state.tools.length === 0) {
      this.intervalID = setInterval(async () => {
        const tools = await api.getTools();
        switch (this.state.sorting) {
          case 'ASC': {
            this.setState({
              tools: this.sortToolsByASC(tools),
            });
            break;
          }
          case 'DESC': {
            this.setState({
              tools: this.sortToolsByDESC(tools),
            });
            break;
          }
          default:
            break;
        }
        if (tools.length > 0) {
          clearInterval(this.intervalID);
          this.intervalID = null;
        }
      }, 1000);
    }
  }


  render() {
    return (
      <div className="app">
        <div>
          <Search
            handleChangeFilterText={this.handleChangeFilterText}
            filterText={this.state.filterText}
          />
        </div>
        <div className="block__sortable-table">
          <SortableTable
            tools={this.state.tools}
            sorting={this.state.sorting}
            filterText={this.state.filterText}
            hoveringToolID={this.state.hoveringToolID}
            handleClickToggleSorting={this.handleClickToggleSorting}
            handleMouseOverToolItem={this.handleMouseOverToolItem}
          />
        </div>
      </div>
    );
  }
}


export default App;
