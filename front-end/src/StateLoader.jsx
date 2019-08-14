import reducer from "./reducers";

// Created in courtesy of https://stackoverflow.com/a/45857898
class StateLoader {
  // Loads the saved state from localStorage
  loadState() {
    try {
      // ToDo
      let serializedState = localStorage.getItem("savedState");

      if (serializedState === null) {
        return this.initializeState();
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return this.initializeState();
      // ToDo
    }
  }
  // Saves the state to localStorage after every change to the states.
  SaveState(state) {
    // ToDo
    try {
      let serializedState = JSON.stringify(state);
      localStorage.setItem("savedState", serializedState);
    } catch (err) {
      console.error(err);
    }
  }
  // If loading a pre-existing state fails, then loads the initialized state.
  initializeState() {
    return {
      reducer
    };
  }
  ClearState() {
    try {
      localStorage.clear();
    } catch (err) {
      console.error(err);
    }
  }
}

export default StateLoader;
