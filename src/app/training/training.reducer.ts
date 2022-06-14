import * as  trainingActions from ".//training.actions";
import * as fromroot from "../app.reducer";
import { Exercise } from "./exercise.model";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface TrainingState {
    availableExercises: Exercise[];
    finishedExercises: Exercise[];
    activeExercise: Exercise;
};

export interface State extends fromroot.State { 
    training: TrainingState;
}

const initialStat:TrainingState = {
    availableExercises: [],
    finishedExercises: [],
    activeExercise: null
}

export function trainingReducer(state = initialStat, action:trainingActions.TrainingActions) { 
    switch (action.type) {
        case trainingActions.SET_AVAILABLE_TRAININGS :
            return {
                ...state,
                availableExercises: action.payload
            }
            break;
        case trainingActions.SET_FINISHED_TRAININGS:
            return {
                ...state,
                finishedExercises: action.payload
            }
            break;
        case trainingActions.SET_ACTIVE_TRAINING:
            return {
                ...state,
                activeExercise: action.payload
            }
            break;
        case trainingActions.START_TRAINING:
            return {
                ...state,
                activeExercise: {...state.availableExercises.find(ex => ex.id === action.payload)}
            }
            break;
        case trainingActions.STOP_TRAINING:
            return {
                activeExercise: null
            }
        default:
            return state;
            break;
    }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableExercises = createSelector(getTrainingState, (state:TrainingState) => state.availableExercises);
export const getFinishedExercises = createSelector(getTrainingState, (state:TrainingState) => state.finishedExercises);
export const getActiveExercise = createSelector(getTrainingState, (state:TrainingState) => state.activeExercise);
export const getIsTraining = createSelector(getTrainingState, (state:TrainingState) => state.activeExercise != null);

