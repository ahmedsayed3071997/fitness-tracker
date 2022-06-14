import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { AuthService } from "./auth.service";

import * as fromRoot from "../app.reducer";
import { take } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService:AuthService, private router:Router, private store:Store<fromRoot.State>) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select(fromRoot.getIsAuthanticated).pipe(take(1));
        // if (this.authService.isAuth()) {
        //     return true
        // } else {
        //     this.router.navigate(['/login'])
        // }
    }
}