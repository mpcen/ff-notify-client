import { action } from 'typesafe-actions';
import { TrackedPlayerPanelActionTypes } from './types';

// SELECT PLAYER
export const selectPlayer = (playerIndex: number) => {
    return action(TrackedPlayerPanelActionTypes.SELECT_PLAYER, playerIndex);
};
