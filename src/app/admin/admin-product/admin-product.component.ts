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
    // this.productService.get().subscribe(data => {
    //   if(data){
    //     this.adminProducts = data;
    //   }
    // })
  }

  loadProducts(): void {
    this.adminProducts = this.productService.getProducts();
  }

  createProduct(): void {
    this.productService.addProducts(this.productForm.value);
    this.productForm.reset();
  }
}
