import React, { Component } from "react";
// import Loading from "./Loading";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  static defaultProps = {
    country: "in",
    pageSize: "8",
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - News SPA`;
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e382398455d54016ae9618ae27b5414c&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.props.setProgress(50);
    let data = await fetch(url);
    this.props.setProgress(70);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  // handlePrevClick = async () => {
  //   this.setState({
  //     page: this.state.page - 1,
  //   });
  //   this.updateNews();
  // };

  // handleNextClick = async () => {
  //   this.setState({
  //     page: this.state.page + 1,
  //   });
  //   this.updateNews();
  // };

  fetchMoreData = async () => {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e382398455d54016ae9618ae27b5414c&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({
      page: this.state.page + 1,
    });
    this.props.setProgress(50);
    let data = await fetch(url);
    this.props.setProgress(70);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
    
    this.props.setProgress(100);
  };

  render() {
    return (
      <>
        <div className="h1 container" style={{marginTop:"70px"}}>
          Top{" "}
          {this.props.category === "general"
            ? this.props.category === ""
            : this.capitalizeFirstLetter(this.props.category)}{" "}
          Headlines
        </div>
        {/* {this.state.loading && <Loading />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
        >
          <div className="container my-3">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-12" key={element.url}>
                    <NewsItem
                      title={element.title}
                      content={element.description}
                      imgURL={
                        element.urlToImage
                        ? element.urlToImage
                        : "http://sivanandaelectronics.com/images/news.jpg"
                      }
                      newsUrl={element.url}
                      date={element.publishedAt}
                      author={element.author}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between mb-2">
          <button
            type="button"
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>

          <button
            type="button"
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}

export default News;
