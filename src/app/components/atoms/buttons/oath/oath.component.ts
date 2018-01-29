import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "button-oath",
  templateUrl: "./oath.component.html",
  styleUrls: ["./oath.component.scss"]
})
export class OathComponent implements OnInit {
  @Input() provider: string;
  @Output() clickEvent = new EventEmitter<boolean>();
  iconURL: string;
  constructor() {}

  clickAction(event) {
    this.clickEvent.emit(true);
  }

  ngOnInit() {
    if (this.provider === "google") {
      this.iconURL = "../../assets/google.png";
    }
  }
}
