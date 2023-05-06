import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,desc,imageUrl,newsurl}=this.props;
    return (
      <div className='my-3'>
        <div className="card" >
        <img src= {!imageUrl?"https://i0.wp.com/www.eastmojo.com/wp-content/uploads/2022/07/james-webb-telescope-first-images.jpg?resize=1536%2C864&ssl=1":imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{desc}</p>
            <a href={newsurl}  target='_blank'rel="noreferrer" className="btn btn-sm btn-primary">Go somewhere</a>
        </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
