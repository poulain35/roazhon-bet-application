import { Component, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from 'app/@fuse/animations';

@Component({
  selector: 'profile2',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ProfileComponent {
  /**
   * Constructor
   */
  constructor() {}
}
