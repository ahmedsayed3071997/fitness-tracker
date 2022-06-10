import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Subject, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { UiServiceService } from "../shared/ui-service.service";
import { Exercise } from "./exercise.model";
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

    constructor(private db: AngularFirestore, private uiService:UiServiceService) { }
    
    public fetchAvailableExercises() {
        this.uiService.loadingStateChanged.next(true);
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
                    this.availableExercises = exercises;
                    this.exericsesChanged.next(this.availableExercises);
                    this.uiService.loadingStateChanged.next(false);
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
        const selectedExersice = this.availableExercises.find(ex => ex.id === selectedId);
        this.runningExercise = selectedExersice;
        this.exericseChanged.next({ ...this.runningExercise })
    }

    public completeExersice() {
        this.addDataToDatabase({
            ...this.runningExercise,
            date: new Date(),
            state: "completed"
        });
        this.runningExercise = null;
        this.exericseChanged.next(null);
    }

    public cancelExercise(progress: number) {
        this.addDataToDatabase({
            ...this.runningExercise,
            duration: this.runningExercise.duration * (progress/100),
            calories:this.runningExercise.calories * (progress/100),
            date: new Date(),
            state: "cancelled"
        });
        this.runningExercise = null;
        this.exericseChanged.next(null);
    }

    public   getRuningExersice() {
        return {...this.runningExercise}
    }

    public fetchCompletedOrCancelledExercises() {
        // return this.exercises.slice();
        this.uiService.loadingStateChanged.next(true);
        this.fbSubs.push(
            this.db.collection('finishedExercises')
            .valueChanges()
            .subscribe((exercises: Exercise[]) => { 
                this.finshedExercises = exercises;
                this.finishedExericsesChanged.next(exercises);
                this.uiService.loadingStateChanged.next(false);
            }, err => {
                this.uiService.loadingStateChanged.next(false);
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