import React from 'react';
import './SortableTable.css';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Tool from '../api/tool';

function SortableTable(props) {
  const renderStatus = (status) => {
    switch (status) {
      case 'blocked':
        return <i className="fas fa-lock" />;
      case 'enable':
        return <div className="tool-item__status-enable">ON</div>;
      case 'disable':
        return <div className="tool-item__status-disable">OFF</div>;
      default:
        return null;
    }
  };

  const renderToolName = (sorting) => (
    <div className="tool-name" onClick={props.handleClickToggleSorting}>
      <div>
        Tool name
      </div>
      <div className="tool-name__arrows">
        <span className={classNames({ active: sorting === 'ASC' })}>
          <i className="fas fa-caret-up" />
        </span>
        <span className={classNames({ active: sorting === 'DESC' })}>
          <i className="fas fa-caret-down" />
        </span>
      </div>
    </div>
  );

  return (
    <div className="sortable-table">
      <div className="sortable-table-header">
        <div className="sortable-table-header__tool-name">{renderToolName(props.sorting)}</div>
        <div className="sortable-table-header__used-on">Used on</div>
        <div className="sortable-table-header__type">Type</div>
        <div className="sortable-table-header__status">Status</div>
      </div>
      <div className="sortable-table-content">
        {props.tools
          .filter((tool) => tool.name.toLowerCase().startsWith(props.filterText.toLowerCase()))
          .map((tool) => (
            <div
              className={classNames('sortable-table__tool-item', { 'sortable-table__tool-item--active': props.hoveringToolID === tool.id })}
              key={tool.id}
              onMouseOver={() => props.handleMouseOverToolItem(tool.id)}
            >
              <div className="sortable-table__tool-item__name">{tool.name}</div>
              <div className="sortable-table__tool-item__sites">{tool.sites}</div>
              <div className="sortable-table__tool-item__type">{tool.type}</div>
              <div className="sortable-table__tool-item__status">{renderStatus(tool.status)}</div>
            </div>
          ))}
      </div>
    </div>
  );
}

SortableTable.propTypes = {
  handleClickToggleSorting: PropTypes.func,
  handleMouseOverToolItem: PropTypes.func,
  tools: PropTypes.arrayOf(Tool),
  filterText: PropTypes.string,
  sorting: PropTypes.string,
  hoveringToolID: PropTypes.number,
};

SortableTable.defaultProps = {
  handleClickToggleSorting: () => undefined,
  handleMouseOverToolItem: () => undefined,
  tools: [],
  filterText: '',
  sorting: 'ASC',
  hoveringToolID: -1,
};


export default SortableTable;
