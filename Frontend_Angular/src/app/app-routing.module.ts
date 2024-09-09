import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PAGE_ROUTES } from 'src/app/common/constant';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AdminGuard } from './guard/admin.guard';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: PAGE_ROUTES.user.list,
        loadChildren: () =>
          import('./pages/users/users.module').then((m) => m.UsersModule),
        canActivate: [AdminGuard, AuthGuard],
      },
      {
        path: PAGE_ROUTES.events.list,
        loadChildren: () =>
          import('./pages/events/events.module').then((m) => m.EventsModule),
        canActivate: [AuthGuard],
      },
      {
        path: '**',
        component: NotFoundComponent,
        loadChildren: () =>
          import('./pages/not-found/not-found.module').then(
            (m) => m.NotFoundModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
