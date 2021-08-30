import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from 'src/app/shared/models/product/product.model';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {

  public adminProducts: Array<IProduct> = [];
  public productForm!: FormGroup;
  public customImage = 'https://origami.lviv.ua/image/vmmcrksfcd/marharyta-small.jpg';
  private editProductID = 0;
  public editStatus = false;

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initProductForm();
    this.loadProducts();
  }

  initProductForm(): void {
    this.productForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, Validators.required],
      weight: [null, Validators.required],
      image: this.customImage
    })
  }

  // loadProducts(): void {
  //   this.adminProducts = this.productService.getProducts();
  // }

  // createProduct(): void {
  //   this.productService.addProducts(this.productForm.value);
  //   this.productForm.reset();
  // }

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
      title: product.title,
      description: product.description,
      price: product.description,
      weight: product.weight,
      image: product.image
    });
    this.editProductID = product.id as number;
    this.editStatus = true;
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
  }

}
