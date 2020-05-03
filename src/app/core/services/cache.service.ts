import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  constructor(
    protected localStorage: LocalStorage,
  ) { }

  public set(key: string, data: any) {
    const result = new Subject();
    this.localStorage.setItem(key, data).subscribe(
      () => {
        result.next(true);
      },
      (err) => {
        console.log('IndexedDb set err', err);
      },
    );
    return result;
  }

  public get(key: string) {
    const schema: any = { type: 'any' }; // TODO: types
    const result = new Subject();
    this.localStorage.getItem(key, { schema }).subscribe((data: any) => {
      result.next(data);
    });
    return result;
  }

  public remove(key: string) {
    this.localStorage.removeItemSubscribe(key);
  }

  public clearAll() {
    const result = new Subject();
    this.localStorage.clear().subscribe(() => {
      result.next(true);
    });
    return result;
  }

  public keys() {
    const result = new Subject();
    this.localStorage.keys().subscribe((keys) => {
      result.next(keys);
    });
    return result;
  }
}
