// ----- Person ----- \\

export const ALL_PEOPLE = "ALL_PEOPLE";
export const CREATE_PERSON = "CREATE_PERSON";
export const FIND_PERSON = "FIND_PERSON";
export const EDIT_PERSON = "EDIT_PERSON";
export const DELETE_PERSON = "DELETE_PERSON";

function AllPeople() {
  return {
    type: ALL_PEOPLE
  };
}

export function AllPeopleAsync() {
  return dispatch => {
    setTimeout(() => {
      dispatch(AllPeople());
    }, 1000);
  };
}

function CreatePerson(person) {
  return {
    type: CREATE_PERSON,
    person: person
  };
}

export function CreatePersonAsync(person) {
  return dispatch => {
    setTimeout(() => {
      dispatch(CreatePerson(person));
    }, 1000);
  };
}

function FindPerson(id) {
  return {
    type: FIND_PERSON,
    id: id
  };
}

export function FindPersonAsync(id) {
  return dispatch => {
    setTimeout(() => {
      dispatch(FindPerson(id));
    }, 1000);
  };
}

function EditPerson(person) {
  return {
    type: EDIT_PERSON,
    person: person
  };
}

export function EditPersonAsync(person) {
  return dispatch => {
    setTimeout(() => {
      dispatch(EditPerson(person));
    }, 1000);
  };
}

function DeletePerson(id) {
  return {
    type: DELETE_PERSON,
    id: id
  };
}

export function DeletePersonAsync(id) {
  return dispatch => {
    setTimeout(() => {
      dispatch(DeletePerson(id));
    }, 1000);
  };
}
