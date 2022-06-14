import { Action } from "@ngrx/store";
import { Exercise } from "./exercise.model";

export const SET_AVAILABLE_TRAININGS = '[Trainig] SET_AVAILABLE_TRAININGS';
export const SET_FINISHED_TRAININGS = '[Trainig] SET_FINISHED_TRAININGS';
export const SET_ACTIVE_TRAINING = '[Trainig] SET_ACTIVE_TRAINING';
export const START_TRAINING = '[Trainig] START_TRAINING';
export const STOP_TRAINING = '[Trainig] STOP_TRAINING';


export class SetAvailableTrainigs implements Action { 
    readonly type = SET_AVAILABLE_TRAININGS;
    constructor(public payload:Exercise[]) { }
}

export class SetFinishedTrainigs implements Action { 
    readonly type = SET_FINISHED_TRAININGS;
    constructor(public payload:Exercise[]) { }
}

export class SetActiveTrainig implements Action { 
    readonly type = SET_ACTIVE_TRAINING;
    constructor(public payload:Exercise[]) { }
}


export class StartTrainig implements Action { 
    readonly type = START_TRAINING;
    constructor(public payload:string) { }
}

export class StopTraining implements Action { 
    readonly type = STOP_TRAINING;
    constructor(public payload?) { }
}


export type TrainingActions = SetAvailableTrainigs | SetFinishedTrainigs | SetActiveTrainig | StartTrainig | StopTraining;

