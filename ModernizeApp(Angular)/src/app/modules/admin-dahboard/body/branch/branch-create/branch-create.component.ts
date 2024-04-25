import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { IBranch } from 'src/app/Models/IBranch';
import { BranchService } from 'src/app/services/branch.service';

@Component({
  selector: 'app-branch-create',
  templateUrl: './branch-create.component.html',
  styleUrls: ['./branch-create.component.css'],
})
export class BranchCreateComponent implements OnInit ,OnDestroy{
   branchCreateSupscription!:Subscription;
  myform = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    location: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
  });
  constructor(
    private branch: BranchService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  Create() {
    if (!this.myform.valid) {
      this.myform.markAllAsTouched();
      return;
    } else {
      const branch: IBranch = {
        id: 0,
        name: this.myform.value.name || '',
        location: this.myform.value.location || '',
        CourseBranches: [],
      };
      console.log(branch);

       this.branchCreateSupscription=this.branch.Create(branch).subscribe({
        next: (result) => {
          if (result.code == 200) {
            this.toastr.success('Branch Created Successfully', '', {
              progressBar: true,
              progressAnimation: 'decreasing',
            });
            this.myform.reset();
          } else {
            if (result.messages == null) {
              this.toastr.error(result.message, '', {
                progressBar: true,
                progressAnimation: 'decreasing',
              });
            } else {
              for (let index = 0; index < result.messages.length; index++) {
                this.toastr.error(result.messages[index], '', {
                  progressBar: true,
                  progressAnimation: 'decreasing',
                });
              }
            }
          }
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.branchCreateSupscription.unsubscribe();
  }
}
