import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ICategory } from 'src/app/shared/models/category/category.model';
import { CategoryService } from 'src/app/shared/services/category/category.service';

import { Observable } from 'rxjs';

import { getStorage, ref, uploadBytes, uploadString, getDownloadURL } from "firebase/storage";
import { FirebaseApp, FirebaseApps } from '@angular/fire/app';
import { Storage, StorageInstances } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {

  public adminCategories: Array<ICategory> = [];
  public categoryForm!: FormGroup;
  // public customIcon = 'https://origami.lviv.ua/image/vmmcrksfcd/marharyta-small.jpg';
  private editCategoryID = 0;
  public editStatus = false;
  public uploadPercent: Observable<number> | undefined | null;
  public icon: string = '';
  public imageStatus: boolean = false;
  public imageUrl!: any;

  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    defaultApp: FirebaseApp,       // Injects the default FirebaseApp
    allFirebaseApps: FirebaseApps, // Injects an array of all initialized Firebase Apps
    storage: Storage,                      // Injects the default storage instance
    allStorageInstances: StorageInstances,
  ) { }

  ngOnInit(): void {
    this.initCategoryForm();
    this.loadCategories();
  }

  initCategoryForm(): void {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      icon: [null]
    })
  }

  loadCategories(): void {
    this.categoryService.get().subscribe(
      data => {
        this.adminCategories = data;
      }, err => {
        console.log(err);
      }
    )
  }

  createCategory(): void {
    const category = this.categoryForm.value;
    this.categoryService.create(category).subscribe(
      () => {
        this.loadCategories();
      }, err => {
        console.log(err);
      }
    )
    this.initCategoryForm();
    this.imageStatus = false;
  }

  deleteCategory(category: ICategory): void {
    this.categoryService.delete(category.id as number).subscribe(
      () => {
        this.loadCategories();
      }, err => {
        console.log(err);
      }
    )
  }

  editCategory(category: ICategory): void {
    this.categoryForm.patchValue({
      name: category.name,
      path: category.path,
      icon: category.icon
    });
    this.editCategoryID = category.id as number;
    this.editStatus = true;
  }

  updateCategory(): void {
    const category = this.categoryForm.value;
    this.categoryService.update(category, this.editCategoryID).subscribe(
      () => {
        this.loadCategories();
      }, err => {
        console.log(err);
      }
    );
    this.initCategoryForm();
    this.editStatus = false;
  }

  // uploadFile(event: any): void {
  //   const file = event.target.files[0];
  //   const filePath = `images/${file.name}`;
  //   const storage = getStorage();
  //   const storageRef = ref(storage, filePath);

  //   const task = uploadBytes(storageRef, file);
  //   task.then((snapshot) => {
  //     getDownloadURL(ref(storage, filePath)).then(img => {
  //       this.icon = img;
  //       this.categoryForm.patchValue({
  //         image: this.icon
  //       })
  //       console.log(this.icon);
  //     })
  //   })

  //   // const task = this.storage.upload(filePath, file);
  //   // this.uploadPercent = task.percentageChanges() as Observable<number>;
  //   // task.then(image => {
  //   //   this.storage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
  //   //     this.icon = url;
  //   //     this.categoryForm.patchValue({
  //   //       icon: this.icon
  //   //     })
  //   //     this.imageStatus = true;
  //   //     this.uploadPercent = null;
  //   //   });
  //   // });
  // }
}
