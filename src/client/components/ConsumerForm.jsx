import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ConsumerForm extends Component {
  static propTypes = {
    consumer: PropTypes.object.isRequired,
    allApiNames: PropTypes.array.isRequired,
    computedMatch: PropTypes.object.isRequired,
    createNew: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  };

  // Base CONSUMER structure to be rendered
  baseConsumer = {
    name: '',
    credentials: [],
    apis: [],
    aclGroups: [],
  };

  constructor(props) {
    super(props);
    const params = props.params || props.computedMatch.params || {};
    const mode = params.mode || 'create';
    const consumer = (mode !== 'create') ? Object.assign(this.baseConsumer, props.consumer || {}) : this.baseConsumer;

    this.state = {
      mode: mode,
      consumer: consumer,
    }
  }

  componentWillReceiveProps(nextProps) {
    const params = nextProps.params || nextProps.computedMatch.params || {};
    const mode = params.mode || 'view';
    const consumer = (mode !== 'create') ? Object.assign(this.baseConsumer, nextProps.consumer || {}) : this.baseConsumer;

    if ((mode !== this.state.mode) || JSON.stringify(consumer) !== JSON.stringify(this.state.consumer)) {
      this.setState(() => {
        return ({ consumer: consumer, mode: mode });
      });
    }
  }

  componentWillMount() {
    // Redirect to list view if this view was accessed without a CURRENT_CONSUMER
    const { history } = this.props;

      if (this.state.mode !== 'create' && Object.keys(this.props.consumer).length === 0) {
      history.push('/consumers');
    }
  }

  componentWillUpdate() {
    // Redirect to list view if this view was accessed without a CURRENT_CONSUMER
    const { history } = this.props;

    if (this.state.mode !== 'create' && Object.keys(this.props.consumer).length === 0) {
      history.push('/consumers');
    }
  }

  //
  // Render helper functions
  //
  genAuthInfo(enabledAuths) {
    const methods = Object.keys(enabledAuths);

    const inputs = 
    methods.map((method) => {
      
      const list = Object.entries(enabledAuths[method]).map(([key, value]) => <li key={key}> <strong> {key} : </strong> {value} </li> );
      return ([
        <strong key={`${method}_header`}> {method} </strong>,
        <ul key={`${method}_list`}>
          {list}
        </ul>,
        <hr />,
      ]);
    });

    return inputs;
  }

  genInput(name, val, key = 0) {
    return (<input type="text" className={name} name={name} defaultValue={val} readOnly={ this.state.mode === 'view'} key={key} />);
  }

  inputList(name, list) {
    const rows = list.map((val, i) => this.genInput(name, val, i));
    const button = (<a type="button" className="btn btn-ghost" value="add-another" key="button" onClick={() => this.setState({ list: list.push('') })}> Add Another </a>);
    return (
      (this.state.mode !== 'view') ? [rows, button] : rows
    );
  }

  // Save function
  save() {
    const saveFunc = (this.state.mode === 'create') ? this.props.createNew : this.props.update;

    // consumer format to be sent to the backend
    const consumer = {
      name: '',
      credentials: {
        basicAuth: {
          username: '',
        },
      },
      apis: [],
    };

    consumer.name = document.getElementsByName('name')[0].value;

    document.getElementsByName('apis').forEach(el => {
      if (el.selected && el.value !== '') consumer.apis.push(el.value);
    });

    consumer.credentials.basicAuth.username = document.getElementsByName('username')[0].value;

    console.log(consumer)
    saveFunc(consumer);
  }

  //
  //  Render
  //
  render() {
    const { errorMessage, allApiNames } = this.props;
    let { mode, consumer } = this.state;

    return (
      <div className="row-fluid consumer-form">
        <h4> {consumer.name} </h4>
        {
          (mode === 'view')
            ? <button className="btn btn-axa" onClick={() => this.props.history.push('/consumer/edit')}> Edit </button>
            : null
        }

        { errorMessage ? <div className="alert alert-danger">{ errorMessage.request.responseText }</div> : null }

        <hr />
        <div className="row consumer-info-row">
          <div className="col-md-12">
            <form action="this.createNew(this)" className="form-view">

              <label> Name </label>
              <div className="inputs">
                <input type="text" className="name" name="name" defaultValue={consumer.name} readOnly={mode === 'view'} />
              </div>

              <label> Credentials </label>
              {
                // Display Username input when creating a new user
                // else display all the generated creds.
                (mode === 'create')
                  ? <div className="inputs">
                      <input type="text" className="username" name="username" defaultValue="" placeholder="Username" />
                    </div>
                  : <div className="inputs checkboxes" aria-labelledby="checkbox-group"> { this.genAuthInfo(consumer.credentials) } </div>
              }

              <label> Apis </label>
              <div className={ (mode !== 'view') ? "inputs axa-select" : "inputs" }> 
                    {
                      (mode !== 'view')
                      ? <select multiple className="apis">
                          {allApiNames.map((name) => ( <option value={name} name="apis" key={name}> {name} </option> ))}
                        </select>
                      : <ul className="apis">
                          {consumer.apis.map((name) => (<li value={name} key={name}> {name} </li>))}
                        </ul>
                    }
              </div>

              {
                // Display ACL groups when in view mode only
                (mode === 'view') 
                ? [ 
                    <label key="acls_label"> ACL Groups </label>,
                    <div className="inputs" key="acls_container"> 
                      <ul className="acls_list">
                        { consumer.aclGroups.map((acl) =>  (<li key={acl}> {acl} </li> )) } 
                      </ul>
                    </div>,
                  ]
                : null
              }

              {
                // display Save or Create New button when NOT in view mode
                (mode !== 'view') 
                ? <button className="btn btn-axa" onClick={() => this.save()} type="button"> 
                    { (mode === 'edit') ? 'Save' : 'Create New' }
                  </button>
                : null
              }
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ConsumerForm;
