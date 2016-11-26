import { connect } from 'react-redux'
import App from './app.js'

function mapStateToProps(state, ownProps) {
    return {}
}

function mapDispatchToProps(dispatch, ownProps) {
    return {}
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)

export default AppContainer
