import { Component,ViewChild,AfterViewInit,ChangeDetectorRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NewsService} from './services/news.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'news-app';
  da:number=12;
  news_source:any=[];
  searchText:any;
  all_news:any=[];
  loading:boolean=true;
  selected_title:string='All Popular News are here...'
  @ViewChild(MatSidenav) sideNav!: MatSidenav;

  constructor(
    private observer : BreakpointObserver,
    private cdr: ChangeDetectorRef,
    private news:NewsService
     ){
  }

  ngOnInit():void{
    this.news.getSource().subscribe((data:any)=>{
      this.news_source=data.sources
    });
    this.getAllNewsHere();


  }

  getAllNewsHere(){
    this.selected_title='All Popular News are here...'
     this.news.getAllNews().subscribe((data:any)=>{
      if(this.loading){
        this.loading = false;
      }
      this.all_news=data.articles
    });
  }

  ngAfterViewInit(): void {
    this.sideNav.opened = true;
    this.observer.observe(['(max-width:800px)'])
    .subscribe((res)=>{
      if(res?.matches){
        this.sideNav.mode="over";
        this.sideNav.close();
      }else{
        this.sideNav.mode = 'side';
        this.sideNav.open();
      }
    })
    this.cdr.detectChanges();

  }

  getNews(source:any){
    this.loading=true
    return this.news.getFilteredNews(source.id).subscribe((res:any)=>{
      this.all_news=res.articles
      this.selected_title=source.name;
      if(this.loading){
        this.loading = !this.loading;
      }
    })
  }

  // search
  search(){

  }
}
