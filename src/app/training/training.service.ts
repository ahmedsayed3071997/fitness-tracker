import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Subject, Subscription } from "rxjs";
import { map, take } from "rxjs/operators";
import { UiServiceService } from "../shared/ui-service.service";
import { Exercise } from "./exercise.model";
import { Store } from "@ngrx/store";
import * as fromTraining from "./training.reducer";
import * as trainingActions from "./training.actions";
import * as UIActions from "../shared/ui.actions";

@Injectable({
    providedIn: 'root'
})
export class TrainingService {

    public exericseChanged = new Subject<Exercise>();
    public exericsesChanged = new Subject<Exercise[]>();
    public finishedExericsesChanged = new Subject<Exercise[]>();
    private availableExercises: Exercise[] = []
    private runningExercise: Exercise;
    private finshedExercises: Exercise[] = [];
    private fbSubs:Subscription[] = [];

    constructor(private db: AngularFirestore, private uiService:UiServiceService,private store:Store<fromTraining.State>) { }
    
    public fetchAvailableExercises() {
        this.store.dispatch(new UIActions.StartLoading());
        this.fbSubs.push(
            this.db.collection('availableExercises').snapshotChanges().pipe(
                map(docArray => { 
                    return docArray.map(document => {
                    let obj: {} = document.payload.doc.data();
                    return {
                        id: document.payload.doc.id,
                        ...obj
                    }})
                    // throw new Error('Method not implemented.');
                })).subscribe((exercises: Exercise[]) => {
                    this.store.dispatch(new trainingActions.SetAvailableTrainigs(exercises));
                    this.store.dispatch(new UIActions.StopLoading());
                }, err => { 
                    this.uiService.showSnackbar('Fetching Exercises failed, please try again later', null, 3000);
                    this.uiService.loadingStateChanged.next(false);
                })
        )
    }

    public startExercise(selectedId: string) {
        this.db.doc('availableExercises/' + selectedId).update({
            lastSelected: new Date()
        })
        this.store.dispatch(new trainingActions.StartTrainig(selectedId));
    }

    public completeExersice() {
        this.store.select(fromTraining.getActiveExercise).pipe(take(1)).subscribe(ex => { 
            this.addDataToDatabase({
                ...ex,
                date: new Date(),
                state: "completed"
            });
            this.store.dispatch(new trainingActions.StopTraining());
        })
    }

    public cancelExercise(progress: number) {
        this.store.select(fromTraining.getActiveExercise).pipe(take(1)).subscribe(ex => { 
            this.addDataToDatabase({
                ...ex,
                duration: ex.duration * (progress/100),
                calories: ex.calories * (progress/100),
                date: new Date(),
                state: "cancelled"
            });
            this.store.dispatch(new trainingActions.StopTraining()); 
        })
    }

    public fetchCompletedOrCancelledExercises() {
        // return this.exercises.slice();
        this.store.dispatch(new UIActions.StartLoading());
        this.fbSubs.push(
            this.db.collection('finishedExercises')
            .valueChanges()
            .subscribe((exercises: Exercise[]) => { 
                this.finshedExercises = exercises;
                // this.finishedExericsesChanged.next(exercises);
                this.store.dispatch(new trainingActions.SetFinishedTrainigs(exercises));
                this.store.dispatch(new UIActions.StopLoading());
            }, err => {
                this.store.dispatch(new UIActions.StopLoading());
                this.finishedExericsesChanged.next(null);
                this.uiService.showSnackbar('Fetching Exercises failed, please try again later', null, 3000);
            }
        )
       )
    }

    cancelSubs() { 
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }

    private addDataToDatabase(exercise: Exercise)  { 
        this.db.collection('finishedExercises').add(exercise)
    }
}