import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-setup',
  templateUrl: './user-setup.component.html',
  styleUrls: ['./user-setup.component.scss']
})
export class UserSetupComponent implements OnInit {

  loading: boolean;
  error: string | null;

  setupForm = this.formBuilder.group({
    name: ['', Validators.pattern('^[a-z0-9_-]{3,15}$')]
  }, {
    updateOn: 'submit'
  });

  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
  }

  finishSetup() {
    this.loading = true;
    this.error = null;

    if(!this.setupForm.valid) {
      this.loading = false;
      this.error = 'Der Name ist ungültig.';
      return;
    }
  }
}
