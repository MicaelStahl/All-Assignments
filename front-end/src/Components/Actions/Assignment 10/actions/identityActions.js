export const ENABLE_IDENTITY_NAVBAR = "ENABLE_IDENTITY_NAVBAR";

function EnableIdentityNavbar() {
  return {
    type: ENABLE_IDENTITY_NAVBAR
  };
}

export function EnableIdentityNavbarAsync() {
  return dispatch => {
    setTimeout(() => {
      dispatch(EnableIdentityNavbar());
    }, 1000);
  };
}
