import React, {Component} from 'react'
import { connect } from 'react-redux'
import { login } from './store'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.login(this.state, this.props.history)
  }


  render () {
    console.log(this.state)
    const {name, password} = this.state
    return (
      <div className='container'>
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Name: </label>
          <input value={name} name='name' onChange={this.handleChange}/>
        </div>
        <div>
          <label>Password: </label>
          <input value={password} name='password' onChange={this.handleChange}/>
        </div>
        <button>Login</button>
      </form>
      </div>
    )
  }

}

const mapDispatchToProp = (dispatch) => {
  return {
    login: (credentials, history) => dispatch(login(credentials, history))
  }
}

export default connect(null, mapDispatchToProp)(Login)
