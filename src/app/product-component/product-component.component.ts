import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pUser } from './Product';

@Component({
  selector: 'app-product-component',
  templateUrl: './product-component.component.html',
  styleUrls: ['./product-component.component.css']
})
export class ProductComponentComponent implements OnInit {

  myForm: FormGroup;
  productName: AbstractControl;
  proId: AbstractControl;
  price: AbstractControl;
  products$: Observable<pUser>;
  baseUrl = 'http://127.0.0.1:8080/';
  currentUser: pUser;

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.myForm = this.fb.group({
      'productName': [''],
      'price': [''],
      'proId': ['']
    });

    this.productName = this.myForm.controls['productName'];
    this.proId = this.myForm.controls['proId'];
    this.price = this.myForm.controls['price'];
  }

  ngOnInit(): void {
    this.products$ = <Observable<pUser>>this.httpClient.get(this.baseUrl + 'products');
  }

  search() {
    if (this.proId.value) {
      this.products$ = <Observable<pUser>>this.httpClient.get(this.baseUrl + 'products/' + this.proId.value);
    } else {
      this.products$ = <Observable<pUser>>this.httpClient.get(this.baseUrl + 'products');
    }
  }

  add() {
    //通过在html表单中的input设置name属性的值，与服务器接收对象的属性值一致，这样表单的value属性就是一个接收对象
    console.log((this.myForm.value));
    //对于可观察对象执行，我们需要订阅其结果
    this.httpClient.post(this.baseUrl + 'product', this.myForm.value).subscribe(
      (val: any) => {//val是服务器返回的值
        if (val.succ) {
          alert('添加成功!');
        }
      }
    );
  }

  select(p: pUser) {
    this.currentUser = p;
    this.myForm.setValue(this.currentUser);
  }

  delete() {
    if (!this.currentUser) {
      alert('必须先选择用户!');
    } else {
      this.httpClient.delete(this.baseUrl + 'product/' + this.currentUser.proId).subscribe(
        (val: any) => {
          if (val.succ) {
            alert('删除成功!');
          }
        }
      )
    }
  }

  update() {
    if (!this.currentUser) {
      alert('必须先选择用户!');
    } else {
      this.httpClient.put(this.baseUrl + 'product', this.myForm.value).subscribe(
        (val: any) => {
          if (val.succ) {
            alert('修改成功!');
          }
        }
      )
    }
  }
}
