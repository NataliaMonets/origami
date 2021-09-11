import { Component, OnInit } from '@angular/core';
import { getStorage, ref, uploadBytes, uploadString } from '@angular/fire/storage';
import { FirebaseApp, FirebaseApps } from '@angular/fire/app';
import { Storage, StorageInstances } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/shared/models/category/category.model';
import { IProduct } from 'src/app/shared/models/product/product.model';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {

  public adminCategories : Array<ICategory> = [];
  public adminProducts: Array<IProduct> = [];
  public productForm!: FormGroup;
  public customImage = 'https://origami.lviv.ua/image/vmmcrksfcd/marharyta-small.jpg';
  private editProductID = 0;
  public editStatus = false;
  public uploadPercent: Observable<number> | undefined | null;
  public image: string = '';
  public imageStatus: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadCategories();
    this.initProductForm();
    this.loadProducts();
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

  initProductForm(): void {
    this.productForm = this.fb.group({
      category: ['Select category', Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      path: [null, Validators.required],
      price: [null, Validators.required],
      weight: [null, Validators.required],
      discount: [null, Validators.required],
      image: [this.customImage, Validators.required],
      count: [1]
    })
  }

  loadProducts(): void {
    this.productService.get().subscribe(
      data => {
        this.adminProducts = data;
      }, err => {
        console.log(err);
      }
    )
  }

  createProduct(): void {
    const newProduct = this.productForm.value;
    this.productService.create(newProduct).subscribe(
      () => {
        this.loadProducts();
      }, err => {
        console.log(err);
      }
    )
    this.initProductForm();
    this.imageStatus = false;
  }

  deleteProduct(product: IProduct): void {
    this.productService.delete(product.id as number).subscribe(
      () => {
        this.loadProducts();
      }, err => {
        console.log(err);
      }
    )
  }

  editProduct(product: IProduct): void {
    this.productForm.patchValue({
      category: product.category.name,
      title: product.title,
      description: product.description,
      path: product.path,
      price: product.price,
      weight: product.weight,
      discount: product.discount,
      image: product.image
    });
    this.editProductID = product.id as number;
    this.editStatus = true;
    this.imageStatus = true;
    this.image = product.image
  }

  updateProduct(): void {
    const product = this.productForm.value;
    this.productService.update(product, this.editProductID).subscribe(
      () => {
        this.loadProducts();
      }, err => {
        console.log(err);
      }
    );
    this.initProductForm();
    this.editStatus = false;
    this.imageStatus = false;
  }

  uploadFile(event: any): void {
    const file = event.target.files[0];
    const filePath = `images/${file.name}`;
    const storage = getStorage();
    const storageRef = ref(storage, filePath);
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file');
      console.log(snapshot);
    })
  }
}
