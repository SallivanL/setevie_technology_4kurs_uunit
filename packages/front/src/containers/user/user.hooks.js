import { bindActionCreators, createSelector } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as userSelectors from '@/store/user.selectors.js';
import { userSlice } from '@/store/user.slice.js';

const userSelect = createSelector(
  (state) => state,
  (state) => ({
    loggedIn: userSelectors.isUserLoggedInSelector(state),
    data: userSelectors.getUserDataSelector(state),
    id: userSelectors.getUserIdSelector(state),
    type: userSelectors.getUserTypeSelector(state),
  }),
);

export function useUserActions() {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(userSlice.actions, dispatch), [dispatch]);
}

export function useUser() {
  const actions = useUserActions();
  const data = useSelector(userSelect);

  return { actions, data };
}

export function useUserState() {
  return useUser().data;
}

export function useUserData() {
  return useSelector(userSelectors.getUserDataSelector);
}

export function useUserType() {
  return useSelector(userSelectors.getUserTypeSelector);
}

export function useUserId() {
  return useSelector(userSelectors.getUserIdSelector);
}
