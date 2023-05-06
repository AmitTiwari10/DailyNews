import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from "./Spinner";
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps={
    country:"in",
    pagesize:8,
    category:"general",
  }
  static propTypes={
    country:PropTypes.string,
    pagesize:PropTypes.number,
    category:PropTypes.string
  }
  constructor(){
    super();
    this.state={
      articles:[],
      loading:false,
      page:1
    }
  }
  
  async componentDidMount(){
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=60b6bbd2d3954809a782f8522a514090&page=1&pagesize=${this.props.pagesize}`;
    this.setState({loading:true});
    let data=await fetch(url);
    let parsedata= await data.json()
    this.setState({articles:parsedata.articles,
      totalResults:parsedata.totalResults,
      loading:false
    })
  }
  
  handlenext=async ()=>{
    if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pagesize))){
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=60b6bbd2d3954809a782f8522a514090&page=${this.state.page+1}&pagesize=${this.props.pagesize}`;
    this.setState({loading:true});
    let data=await fetch(url);
    let parsedata= await data.json()
    
    this.setState({
      articles:parsedata.articles,
      page:this.state.page+1,
      loading:false
    })
  }
}
  handleprev=async()=>{
    console.log("prev")
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=60b6bbd2d3954809a782f8522a514090&page=${this.state.page-1}&pagesize=${this.props.pagesize}`;
    this.setState({loading:true});
    let data=await fetch(url);
    let parsedata= await data.json()
    this.setState({
      page:this.state.page-1,
      articles:parsedata.articles,
      loading:false


  })
}
  render() {
    
    return (
        
      <div className='container my-3' >
        <h2 className='text-center' style={{margin:"40px 0px"}}>Top Headlines</h2>
        {this.state.loading && <Spinner />}
        <div className='row'> 
        {!this.state.loading && this.state.articles.map((elem)=>{
          return <div className='col-md-4'key={elem.url} >
                    <NewsItem title={elem.title?elem.title:""} desc={elem.description?elem.description:""} imageUrl={elem.urlToImage} newsurl={elem.url}/>
                    </div>
        })
        }
        <div className='container d-flex justify-content-between'>
        <button disabled={this.page<=1} type="button" className="btn btn-success" onClick={this.handleprev}>&larr;Previous</button>
        <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pagesize)} type="button" className="btn btn-success" onClick={this.handlenext}>Next &rarr;</button>
        </div>
        </div>

      </div>
    )
  }
}

export default News
