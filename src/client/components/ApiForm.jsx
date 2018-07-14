import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ApiForm extends Component {
  static propTypes = {
    api: PropTypes.object.isRequired,
    computedMatch: PropTypes.object.isRequired,
    createNew: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  };

  // Base API structure to be rendered
  baseApi = {
    name: '',
    auth: [],
    routing: {
      methods: [],
      hosts: [],
      uris: [],
      upstreamUrl: '',
      stripUri: false,
    },
    plugins: {
      ipRestriction: {
        whitelist: [],
        blacklist: [],
      },
    },
  };

  constructor(props) {
    super(props);
    const params = props.params || props.computedMatch.params || {};
    const mode = params.mode || 'create';
    const api = (mode !== 'create') ? Object.assign(this.baseApi, props.api || {}) : this.baseApi;

    this.state = {
      mode: mode,
      api: api,
    };
  }

  componentWillReceiveProps(nextProps) {
    const params = nextProps.params || nextProps.computedMatch.params || {};
    const mode = params.mode || 'view';
    const api = (mode !== 'create') ? Object.assign(this.baseApi, nextProps.api || {}) : this.baseApi;

    if ((mode !== this.state.mode) || JSON.stringify(api) !== JSON.stringify(this.state.api)) {
      this.setState(() => {
        return ({ api: api, mode: mode });
      });
    }
  }

  componentWillMount() {
    // Redirect to list view if this view was accessed without a CURRENT_API
    const { history } = this.props;

    if (this.state.mode !== 'create' && Object.keys(this.props.api).length === 0) {
      history.push('/apis');
    }
  }

  componentWillUpdate() {
    // Redirect to list view if this view was accessed without a CURRENT_API
    const { history } = this.props;

    if (this.state.mode !== 'create' && Object.keys(this.props.api).length === 0) {
      history.push('/apis');
    }
  }

  //
  // Render helper functions
  //
  genAuthCheckboxes(enabledAuths) {
    const authMap = {
      'jwt': false,
      'basic_auth': false,
      'key_auth': false,
    };

    let enabledAuthsMap = enabledAuths.reduce((accum, value) => Object.assign(accum, { [value]: true }), {});
    enabledAuthsMap = Object.assign(authMap, enabledAuthsMap);

    const inputs = Object.entries(enabledAuthsMap).map(([key, value]) => (
      <p key={key}> 
        <input type="checkbox" name="auth" value={key} defaultChecked={value} disabled={this.state.mode === 'view'}/>
        {key}
      </p>
    ));

    return inputs;
  }

  genMethodCheckboxes(enabledMethods) {
    const methodMap = {
      'GET': false,
      'POST': false,
      'PUT': false,
      'PATCH': false,
      'DELETE': false,
    };

    let enabledMethodsMap = enabledMethods.reduce((accum, value) => Object.assign(accum, { [value]: true }), {});
    enabledMethodsMap = Object.assign(methodMap, enabledMethodsMap);

    const inputs = Object.entries(enabledMethodsMap).map(([key, value]) => (
      <p key={key}>
        <input type="checkbox" name="methods" value={key} defaultChecked={value} disabled={this.state.mode === 'view'}/>
        {key}
      </p>
    ));

    return inputs;
  }

  genInput(name, val, key = 0) {
    return (<input type="text" className={name} name={name} defaultValue={val} readOnly={this.state.mode === 'view'} key={key} />);
  }

  inputList(name, list) {
    const rows = list.map((val, i) => this.genInput(name, val, i));
    const button = (<button type="button" className="btn btn-ghost" value="add-another" key="button" onClick={() => this.setState({ list: list.push('') })}> Add Another </button>);
    return (
      (this.state.mode !== 'view') ? [rows, button] : rows
    );
  }

  // Save function
  save() {
    const saveFunc = (this.state.mode === 'create') ? this.props.createNew : this.props.update;

    // api format to be sent to the backend
    const api = {
      name: '',
      routing: {
        uris: [],
        hosts: [],
        methods:[],
        upstreamUrl: '',
        stripUri: false,
      },
      plugins: {
        auth: [],
        ipRestriction: {
          whitelist: [],
          blacklist: [], 
        },
        rateLimit: {},
      },
    };

    api.name = document.getElementsByName('name')[0].value;
    api.routing.upstreamUrl = document.getElementsByName('upstreamUrl')[0].value;
    api.routing.stripUri = document.getElementsByName('stripUri')[0].checked;

    document.getElementsByName('auth').forEach(el => {
      if (el.checked && el.value !== '') api.plugins.auth.push(el.value);
    });
    document.getElementsByName('methods').forEach(el => {
      if (el.checked && el.value !== '') api.routing.methods.push(el.value);
    });
    
    document.getElementsByName('uris').forEach(el => {
      if (el.value !== '') api.routing.uris.push(el.value)
    });
    document.getElementsByName('hosts').forEach(el => {
      if (el.value !== '') api.routing.hosts.push(el.value)
    });
    document.getElementsByName('ipRestriction').forEach(el => {
      if (el.value !== '') api.plugins.ipRestriction.whitelist.push(el.value)
    });

    console.log(api)
    saveFunc(api);
  }

  //
  //  Render
  //
  render() {
    const { errorMessage } = this.props;
    let { mode, api } = this.state;

    return (
      <div className="row-fluid api-form">
        <h4> { api.name } </h4>
        {
          (mode === 'view')
            ? <button className="btn btn-axa" onClick={() => this.props.history.push('/api/edit')}> Edit </button>
            : null
        }

        {errorMessage ? <div className="alert alert-danger">{errorMessage.request.responseText}</div> : null}

        <hr />
        <div className="row-fluid api-info-row">
          <div className="col-md-12">
            <form action="this.createNew(this)" className="form-view">
              <label> Api Name </label>
              <div className="inputs">
                <input type="text" className="name" name="name" defaultValue={api.name} readOnly={ mode === 'view' } />
              </div>

              <label> Authentication Methods </label>
              <div className="inputs checkboxes"> { this.genAuthCheckboxes(api.auth )} </div>

              <label className="separator"> Routing </label>
              <hr className="separator separator-hr"/>

              <label> Upstream Url </label>
              <div className="inputs">
                <input type="text" className="upstream-url" name="upstreamUrl" defaultValue={api.routing.upstreamUrl} readOnly={mode === 'view'} />
              </div>

              <label> Methods </label>
              <div className="inputs checkboxes"> {this.genMethodCheckboxes(api.routing.methods) } </div>
             
              <label> Hosts </label>
              <div className="inputs"> { this.inputList('hosts', api.routing.hosts) } </div>
             
              <label> Uris </label>
              <div className="inputs"> { this.inputList('uris', api.routing.uris) } </div>

              <label> Strip Uri </label>
              <div className="inputs checkboxes">
                <p>
                  <input type="checkbox" className="strip-url" name="stripUri" checkedd={api.stripUri} disabled={mode === 'view'} />
                  YES
                </p>
              </div>

              <label className="separator"> Plugins </label>
              <hr className="separator separator-hr"/>

              <label> IP Whitelist </label>
              <div className="inputs"> {this.inputList('ipRestriction', api.plugins.ipRestriction.whitelist)} </div>

              {
                (mode !== 'view')
                  ? <button className="btn btn-axa center" onClick={() => this.save()} type="button">
                      {(mode === 'edit') ? 'Save' : 'Create New'}
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

export default ApiForm;
