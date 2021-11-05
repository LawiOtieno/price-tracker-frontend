import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../classes/product';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private baseURL = "https://price-tracker-backend.herokuapp.com/api"

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  
  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  registerUser(name: string, email: string, password: string) {
    const url = `${this.baseURL}/user`
    let promise = new Promise((resolve, reject) => {
      this.http
      .post<any>(url, {name, email, password})
      .toPromise()
      .then(
        res => {
          resolve({registered: true});
        },
        error => {
          reject(error)
        })
    })
    return promise
  }

  login(email: string, password: string) {
    const url = `${this.baseURL}/login`
    let promise = new Promise((resolve, reject) => {
      this.http
      .post<any>(url, {email, password})
      .toPromise()
      .then(
        res => {
          localStorage.setItem('currentUser', JSON.stringify(res));
          this.currentUserSubject.next(res);
          resolve({authenticated: true, user: res.user});
        },
        error => {
          resolve(error.error.message)
        })
    })
    return promise
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  fetchProducts(): Promise<Product[]> {
    const url = `${this.baseURL}/products`;
    let promise = new Promise<Product[]>((resolve, reject) => {
      this.http
      .get<any>(url)
      .toPromise()
      .then(
        res => {
          let products: Product[] = res.map((product: any) => {
            return new Product(product.id, product.name, product.current_price, product.image_url, product.link, product.discount, product.date_added);
          });
          resolve(products);
        },
        error => {
          resolve(error.error.message)
        })
    })
    return promise
  }
}
