import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { FuseSharedModule } from 'app/@fuse/shared.module';

import { AcademyCoursesComponent } from 'app/apps/academy/courses/courses.component';
import { AcademyCourseComponent } from 'app/apps/academy/course/course.component';
import { AcademyCoursesService } from 'app/apps/academy/courses.service';
import { AcademyCourseService } from 'app/apps/academy/course.service';
import { FuseSidebarModule } from 'app/@fuse/components';

const routes = [
  {
    path: 'courses',
    component: AcademyCoursesComponent,
    resolve: {
      academy: AcademyCoursesService
    }
  },
  {
    path: 'courses/:courseId/:courseSlug',
    component: AcademyCourseComponent,
    resolve: {
      academy: AcademyCourseService
    }
  },
  {
    path: '**',
    redirectTo: 'courses'
  }
];

@NgModule({
  declarations: [AcademyCoursesComponent, AcademyCourseComponent],
  imports: [
    RouterModule.forChild(routes),

    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,

    FuseSharedModule,
    FuseSidebarModule
  ],
  providers: [AcademyCoursesService, AcademyCourseService]
})
export class AcademyModule {}
