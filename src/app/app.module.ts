// application-wide modules
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireAuthModule } from "angularfire2/auth";
import { environment } from "../environments/environment";
import { DragulaModule } from "ng2-dragula";
import { ClickOutsideModule } from "ng4-click-outside";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CalendarModule } from "angular-calendar";
import { ContenteditableDirective } from 'ng-contenteditable';
import { HotkeyModule } from 'angular2-hotkeys';
import { NgDatepickerModule } from 'ng2-datepicker';

// filters
import { LaneFilter } from "./filters/lane.filter";
import { TypographyFilter } from "./filters/typography.filter";
import { TodoDateFilter } from "./filters/todo-date.filter";

// services
import { RouterModule, Routes } from "@angular/router";
import { TodosService } from "./services/todos/todos.service";
import { AuthService } from "./services/auth/auth.service";
import { DateUtilsService } from "./services/utils/date-utils.service";
import { PositionUtilsService } from "./services/utils/position-utils.service";
import { KeyboardUtilsService } from "./services/utils/keyboard-utils.service";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { BoardComponent } from "./components/pages/board/board.component";
import { NavComponent } from "./components/molecules/nav/nav.component";
import { LoginComponent } from "./components/pages/login/login.component";
import { NewTodoComponent } from "./components/molecules/new-todo/new-todo.component";
import { TodoComponent } from "./components/pages/board/todo/todo.component";
import { CheckboxComponent } from "./components/atoms/checkbox/checkbox.component";
import { ReviewComponent } from "./components/pages/review/review.component";
import { PlanComponent } from "./components/pages/plan/plan.component";
import { InputComponent } from "./components/atoms/input/input.component";
import { OathComponent } from "./components/atoms/buttons/oath/oath.component";
import { CalendarComponent } from "./components/molecules/calendar/calendar.component";
import { LogoComponent } from './components/atoms/logo/logo.component';
import { AddEditTodoComponent } from './components/molecules/add-edit-todo/add-edit-todo.component';
import { PlusComponent } from './components/atoms/buttons/plus/plus.component';

const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "/board",
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "board",
    component: BoardComponent
  },
  {
    path: "review",
    component: ReviewComponent
  },
  {
    path: "plan",
    component: PlanComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    NavComponent,
    LoginComponent,
    NewTodoComponent,
    LaneFilter,
    TypographyFilter,
    TodoComponent,
    TodoDateFilter,
    CheckboxComponent,
    ReviewComponent,
    PlanComponent,
    InputComponent,
    OathComponent,
    CalendarComponent,
    LogoComponent,
    AddEditTodoComponent,
    ContenteditableDirective,
    PlusComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot(),
    ClickOutsideModule,
    DragulaModule,
    FormsModule,
    HotkeyModule.forRoot(),
    HttpModule,
    NgDatepickerModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    TodosService,
    DateUtilsService,
    PositionUtilsService,
    KeyboardUtilsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
