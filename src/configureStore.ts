import { applyMiddleware, createStore, Store } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import logger from "redux-logger"
import { IApplicationState, rootReducer } from "./store"

export default (): Store<IApplicationState> => createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(logger)
  )
)
