import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { WelcomeComponent } from "./welcome/welcome.component";

const routes: Routes = [
    { path: '', component: WelcomeComponent },
    {path: 'training',  loadChildren: () => import('./training/training.module').then(m => m.TraingingModule),canActivate: [AuthGuard]},
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes,{ preloadingStrategy: PreloadAllModules, useHash: true })
    ],
    exports: [
        RouterModule
    ],
    providers: [AuthGuard]
})
export class AppRoutingModule { }