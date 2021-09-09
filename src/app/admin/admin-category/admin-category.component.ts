import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getStorage } from 'firebase/storage';
import { ToastrService } from 'ngx-toastr';
import { ICategory } from 'src/app/shared/models/category/category.model';
import { CategoryService } from 'src/app/shared/services/category/category.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {

  public adminCategories: Array<ICategory> = [];
  public categoryForm!: FormGroup;
  public customIcon = 'https://origami.lviv.ua/image/vmmcrksfcd/marharyta-small.jpg';
  private editCategoryID = 0;
  public editStatus = false;

  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    // private storage = getStorage()
  ) { }

  ngOnInit(): void {
    this.initCategoryForm();
    this.loadCategories();
  }

  initCategoryForm(): void {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      icon: this.customIcon
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

}
