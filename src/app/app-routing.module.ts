import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AboutMeComponent } from "./about-me/about-me.component";
import { ConverterComponent } from "./converter/converter.component";
import { MainLayoutComponent } from "./main-layout/main-layout.component";

const routes: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    children: [
      { path: "", component: ConverterComponent },
      { path: "aboutme", component: AboutMeComponent },
      { path: "converter", redirectTo: "", pathMatch: "full" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
