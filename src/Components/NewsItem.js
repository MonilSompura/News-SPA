import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, content, imgURL, newsUrl, date, author } = this.props;
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return (
      <div className="card mb-3 mw-100">
        <div className="row">
          <div className="col-md-4">
            <a href={newsUrl} target="_blank" rel="noreferrer">
              <img src={imgURL} className="img-fluid rounded-start h-10" alt="..." />
            </a>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{content}</p>
              <p className="card-text">
                <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">
                  Read More
                </a>
              </p>
            </div>
            <div className="card-footer d-flex justify-content-between">
              <small className="text-muted">{new Date(date).toLocaleString('en-GB',options)}</small>
              <small className="text-muted">By {!author?"Unknown Author":author}</small>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
