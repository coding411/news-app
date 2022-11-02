import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class NewsService {

  constructor(private http:HttpClient) { }
  base_url:string='https://newsapi.org/v2';
  api_key:string="7330f3932dd24ef4ac3fd70b62d9bf12";
  getSource(){
      return this.http.get(`${this.base_url}/sources?language=en&apiKey=${this.api_key}`);
  }

  getAllNews(){
    return this.http.get(`${this.base_url}/top-headlines?sources=techcrunch&apiKey=${this.api_key}`)
  }

  getFilteredNews(source:any){
    return this.http.get('https://newsapi.org/v2/top-headlines?sources=' + source + '&apiKey=' + this.api_key);
  }
}
