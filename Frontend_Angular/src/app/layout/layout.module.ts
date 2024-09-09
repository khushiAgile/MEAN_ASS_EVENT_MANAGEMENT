import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [NavbarComponent, DefaultLayoutComponent],
  imports: [CommonModule, MaterialModule, RouterOutlet, RouterModule],
})
export class LayoutModule {}
