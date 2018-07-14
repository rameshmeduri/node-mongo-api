import React, { Component } from 'react';
import PropTypes from 'prop-types';

class List extends Component {
  static propTypes = {
    model: PropTypes.string.isRequired,
    loadData: PropTypes.func.isRequired,
    list: PropTypes.array.isRequired,
    createNew: PropTypes.func.isRequired,
    gotoEdit: PropTypes.func.isRequired,
    gotoView: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.loadData();
  }

  static fieldMapping = {
    Apis: ['name', 'methods', 'uris', 'upstreamUrl'],
    Consumers: ['name', 'credentials'],
  };

  render() {
    const state = Object.assign({}, this.props);
    const middleRow = (state.model === 'Consumers') ? 'apis' : 'routing';

    function apiDetails(api) {
      return (
        <table className="api-routing-details">
          <tbody>
            <tr>
              <td>
                <ul>
                {
                  api.methods.map((el, i) => {
                    return (<li key={i}> { el } </li>)
                  })
                }
                </ul>
              </td>
              <td>
                <ul>
                {
                  api.uris.map((el, i) => {
                    return (<li key={i}> { el } </li>)
                  })
                }
                </ul>
              </td>
              <td className="divider">
                <span className="glyphicon glyphicon-arrow-right" />
              </td>
              <td>
                <ul>
                <li> { api.upstreamUrl } </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      )
    }

    function Entries() {
      if (!state.list || !state.list.map) return null;
      return state.list.map((elem) => {
        let el = JSON.parse(JSON.stringify(elem));
        return (
          <tr key={el._id}>
            <td> <div className="y-center"> { el.name } </div> </td>
            <td> { state.model === ('Consumers') 
                    ? el[middleRow].map((el, i) => (<li key={i}> { el } </li>)) 
                    : apiDetails(el[middleRow]) } </td>
            <td>
              <div className="action-buttons y-center right">
                <button className="btn btn-axa" onClick={state.gotoView.bind(this, el)}> View </button>
                <span> &#32; </span>
                <button className="btn btn-axa" onClick={state.gotoEdit.bind(this, el)}> Edit </button>
              </div>
            </td>
          </tr>
        )
      });
    }

    return (
      <div className="list-view">
        <div className="row-fluid table-header">
          <h4> All { state.model } </h4>
          <button className="btn btn-axa" onClick={state.createNew}> Add New </button>
        </div>
        <div className="row-fluid">
          <table className="table table-striped table-responsive">
            <thead>
              <tr>
                <th> Name </th>
                <th> {middleRow} </th>
                <th className="right"> Actions </th>
              </tr>
            </thead>
            <tbody>
              <Entries />
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default List;
