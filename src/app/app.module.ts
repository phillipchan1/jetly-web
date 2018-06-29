// application-wide modules
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { environment } from "../environments/environment";
import { HttpModule } from "@angular/http";
import { NgModule } from "@angular/core";

// plugins
import { CalendarModule } from "angular-calendar";
import { ClickOutsideModule } from "ng4-click-outside";
import { ContenteditableDirective } from 'ng-contenteditable';
import { DragulaModule } from "ng2-dragula";
import { HotkeyModule } from 'angular2-hotkeys';
import { NgDatepickerModule } from 'ng2-datepicker';
import { TooltipModule } from 'ng2-tooltip-directive';

// filters
import { LaneFilter } from "./filters/lane.filter";
import { TypographyFilter } from "./filters/typography.filter";
import { TodoDateFilter } from "./filters/todo-date.filter";

// services
import { AuthService } from "./services/auth/auth.service";
import { DateUtilsService } from "./services/utils/date-utils.service";
import { FormsModule } from "@angular/forms";
import { KeyboardUtilsService } from "./services/utils/keyboard-utils.service";
import { PositionUtilsService } from "./services/utils/position-utils.service";
import { RouterModule, Routes } from "@angular/router";
import { TodosService } from "./services/todos/todos.service";

import { AddEditTodoComponent } from './components/molecules/add-edit-todo/add-edit-todo.component';
import { AppComponent } from "./app.component";
import { BoardComponent } from "./components/pages/board/board.component";
import { CalendarComponent } from "./components/molecules/calendar/calendar.component";
import { CheckboxComponent } from "./components/atoms/checkbox/checkbox.component";
import { InputComponent } from "./components/atoms/input/input.component";
import { LoginComponent } from "./components/pages/login/login.component";
import { LogoComponent } from './components/atoms/logo/logo.component';
import { NavComponent } from "./components/molecules/nav/nav.component";
import { NewTodoComponent } from "./components/molecules/new-todo/new-todo.component";
import { OathComponent } from "./components/atoms/buttons/oath/oath.component";
import { PlanComponent } from "./components/pages/plan/plan.component";
import { PlusComponent } from './components/atoms/buttons/plus/plus.component';
import { ReviewComponent } from "./components/pages/review/review.component";
import { TodoComponent } from "./components/pages/board/todo/todo.component";

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
		AngularFireAuthModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		BrowserAnimationsModule,
		BrowserModule,
		CalendarModule.forRoot(),
		ClickOutsideModule,
		DragulaModule,
		FormsModule,
		HotkeyModule.forRoot(),
		HttpModule,
		NgDatepickerModule,
		RouterModule.forRoot(appRoutes),
		TooltipModule
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
