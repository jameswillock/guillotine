import { Store, createStore } from 'redux'
import { ApplicationState, rootReducer } from './store'

export default (): Store<ApplicationState> => createStore(rootReducer)
