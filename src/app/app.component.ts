import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;
  constructor(private postService: PostsService) {}              // injectime http clienti ja yleval impordime

  ngOnInit() {

    this.onFetchPosts()
  }

  onCreatePost(postData: Post) {
    // Send Http request
    
    this.postService.onCreatePost(postData);
    
    
    
    
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching=true;
    this.postService.fetchPosts().subscribe(data => {      // must t88 on services
    this.loadedPosts=data;
  
   })
   this.isFetching=false;

  }
    




 

  onClearPosts() {
    // Send Http request
    this.postService.deletePost().subscribe(responseData => {

      if(responseData===null){
        console.log('DELETED')
        this.loadedPosts=[];
      }
    })
  }
  
   
}
