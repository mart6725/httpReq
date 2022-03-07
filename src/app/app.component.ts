import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './posts.service';
import {Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error=null;
  errSubscription = new Subscription;


  constructor(private postService: PostsService) {}              // injectime http clienti ja yleval impordime

  ngOnInit() {

    this.onFetchPosts()



    this.errSubscription=this.postService.error.subscribe(err =>{              // subscribeme servive error emitterile 
      this.error=err;
    })
  }

 onCreatePost(postData: Post) {
    // Send Http request
    
    this.postService.onCreatePost(postData)
    
 
    
     
    

   
    
    
    
    
    
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching=true;
    this.postService.fetchPosts().subscribe(data => {      // must t88 on services
    this.loadedPosts=data;
  
   }, error => {
      this.error=error.message;
      console.log(error)
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
    }, error => {
      this.error=error.message;
    })
  }

  ngOnDestroy() {
    this.errSubscription.unsubscribe();
  }
  
   
}
