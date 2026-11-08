import { createSelector } from '@reduxjs/toolkit';
import { initialUserState } from './user.slice.js';

const selectUserFeature = (state) => state?.user ?? initialUserState;

export const getUserDataSelector = createSelector(selectUserFeature, (userState) => userState.data);
export const isUserLoggedInSelector = createSelector(getUserDataSelector, (userData) => userData !== null);
export const getUserIdSelector = createSelector(getUserDataSelector, (userData) => userData?.id ?? null);
export const getSelectedStudentIdSelector = createSelector(
  selectUserFeature,
  (userState) => userState.selectedStudentId,
);

/**
 * Возвращает 1 для учителя, 2 для ученика, 3 для администратора или null,
 * пока данные пользователя не заданы.
 *
 * @param {object} state Redux root state
 * @returns {number | null}
 */
export const getUserTypeSelector = createSelector(
  getUserDataSelector,
  (userData) => userData?.type ?? null,
);

