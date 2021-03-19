import React, { Component } from 'react';
import GifList from './GifList';
import SearchForm from './SearchForm';
import InfiniteScroll from 'react-infinite-scroller';
import './App.css';

const apiKey = require('./secret.js')

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gifs: [],
      offset: 0,
      query: '',
      loading: true
    }
  }

  componentDidMount() {
    this.performSearch()
  }

  performSearch = (query = 'grand') => {
    // String literal to allow interpolation of query variable
    fetch(`https://api.gfycat.com/v1/gifs/search?q=${query}&limit=20&api_key=${apiKey}`)
    .then(response => response.json())
    .then(responseData => {
      console.log('Search data fetched.');
      this.setState({ 
        gifs: responseData.data,
        offset: 0,
        query: query,
        loading: false
      });
    })
    .catch(e => {
      console.log('Error fetching search data: '+e);
    });  
  }

  infinityLoader = () => {
    document.querySelector('.loader').textContent = "Loading more gifs...";
    // Limit total loaded gifs to under 200...that seems reasonable
    if(this.state.offset > 200) {
      document.querySelector('.loader').textContent = "I think that's enough gifs for now. Try another search or come back later.";
    } else {
      fetch(`https://api.gfycat.com/v1/gifs/Search?q=${this.state.query || 'grand'}&offset=${this.state.offset}&api_key=${apiKey}&limit=10`)
      .then(response => response.json())
      .then(responseData => {
        console.log('Infinity data fetched.');
        this.setState({ 
          gifs: this.state.gifs.concat(responseData.data),
          offset: (responseData.pagination.offset+10),
          loading: false
        });
      })
      .catch(e => {
        console.log('Error fetching infinite page data: '+e);
      });  
    }    
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <h1>gif search</h1>
          <SearchForm onSearch={this.performSearch} />
        </div>
        <div id="gifs">
          <InfiniteScroll
            pageStart={0}
            loadMore={this.infinityLoader}
            hasMore={true}
            loader={<div className="loader" key={8999}>Loading more gifs...</div>}
          >
            {
              (this.state.loading)
              ? "Please enter a search above to see GIFs."
              : <GifList data={this.state.gifs} />
            }
          </InfiniteScroll>
        </div>
        <div className="footer">
          <img src="./PoweredBy_200px-White_HorizLogo.png" alt="Gif Search is Powered by the Giphy Developers API - Thanks Giphy"></img>
        </div>
      </div>
    );
  }
}

export default App;
