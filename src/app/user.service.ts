import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

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
    return this._http
      .put(`/api/users/${name}`, { full_name: newName })
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("An error occurred:", error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    if (error.status === 404) {
      return throwError("User not found");
    }
    return throwError("Something bad happened; please try again later.");
  }
}
