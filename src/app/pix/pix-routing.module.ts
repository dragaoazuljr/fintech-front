import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PixManagementComponent } from "./pix-management/pix-management.component";

const PixRoutes: Routes = [
	{ path: '', component: PixManagementComponent }
]

@NgModule({
	imports: [
		RouterModule.forChild(PixRoutes)
	],
	exports: [
		RouterModule
	]
})
export class PixRoutingModule {}