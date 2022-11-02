import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class NewsService {

  constructor(private http:HttpClient) { }
  base_url:string=environment.BASE_API;
  api_key:string=environment.API_KEY;
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
