import { Store, createStore, applyMiddleware } from 'redux'
import { ApplicationState, rootReducer } from './store'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'

export default (): Store<ApplicationState> => createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(logger)
  )
)
