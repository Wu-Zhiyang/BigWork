import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './User';

@Component({
  selector: 'app-user-management-component',
  templateUrl: './user-management-component.component.html',
  styleUrls: ['./user-management-component.component.css']
})
export class UserManagementComponentComponent implements OnInit {
  myForm: FormGroup;
  userName: AbstractControl;
  userId: AbstractControl;
  password: AbstractControl;
  users$: Observable<User>;
  baseUrl = 'http://127.0.0.1:8080/';
  currentUser: User;

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.myForm = this.fb.group({
      'userName': [''],
      'password': [''],
      'userId': ['']
    });

    this.userName = this.myForm.controls['userName'];
    this.userId = this.myForm.controls['userId'];
    this.password = this.myForm.controls['password'];
  }

  ngOnInit(): void {
    this.users$ = <Observable<User>>this.httpClient.get(this.baseUrl + 'users');
  }

  search() {
    if (this.userId.value) {
      this.users$ = <Observable<User>>this.httpClient.get(this.baseUrl + 'users/' + this.userId.value);
    } else {
      this.users$ = <Observable<User>>this.httpClient.get(this.baseUrl + 'users');
    }
  }

  add() {
    //通过在html表单中的input设置name属性的值，与服务器接收对象的属性值一致，这样表单的value属性就是一个接收对象
    console.log((this.myForm.value));
    //对于可观察对象执行，我们需要订阅其结果
    this.httpClient.post(this.baseUrl + 'user', this.myForm.value).subscribe(
      (val: any) => {//val是服务器返回的值
        if (val.succ) {
          alert('添加成功!');
        }
      }
    );
  }

  select(u: User) {
    this.currentUser = u;
    this.myForm.setValue(this.currentUser);
  }

  delete() {
    if (!this.currentUser) {
      alert('必须先选择用户!');
    } else {
      this.httpClient.delete(this.baseUrl + 'user/' + this.currentUser.userId).subscribe(
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
      this.httpClient.put(this.baseUrl + 'user', this.myForm.value).subscribe(
        (val: any) => {
          if (val.succ) {
            alert('修改成功!');
          }
        }
      )
    }
  }
}
