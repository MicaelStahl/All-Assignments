export const LOADING = "LOADING";

function ItemsAreLoading(isLoading) {
  return {
    type: LOADING,
    isLoading
  };
}

export function ItemsAreLoadingAsync(isLoading = false) {
  return dispatch => {
    dispatch(ItemsAreLoading(isLoading));
  };
}
