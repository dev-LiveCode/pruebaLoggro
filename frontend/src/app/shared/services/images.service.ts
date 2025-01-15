import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IImage, IRangeDate } from '../interfaces/utils.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private path: string = 'http://localhost:3000/api/images';

  public httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient) { }

  getAllImages(): Observable<any> {
    return this.http.get<IImage[]>(`${this.path}`, this.httpOptions)
  }

  getImagesByRangeDates(range: IRangeDate): Observable<any> {
    return this.http.get<IImage[]>(`${this.path}/range?startDate=${range.startDate}&endDate=${range.endDate}`, this.httpOptions)
  }

  getAverageByHour(range: IRangeDate): Observable<any> {
    return this.http.get<IImage[]>(`${this.path}/hourly?startDate=${range.startDate}&endDate=${range.endDate}`, this.httpOptions)
  }

  uploadImages(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.path}`, formData, this.httpOptions)
  }
}
