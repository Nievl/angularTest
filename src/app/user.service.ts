import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private userList;

  constructor(private _http: HttpClient) {}

  public getAll() {
    return this._http.get("/api/users");
  }
  public update(name: string, newName: string) {
    return this._http.put(`/api/users/${name}`, { full_name: newName });
  }
}
