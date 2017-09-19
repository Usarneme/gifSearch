import React, { Component } from 'react';
import GifList from './GifList';
import SearchForm from './SearchForm';
import InfiniteScroll from 'react-infinite-scroller';
import './App.css';

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
    fetch(`https://api.giphy.com/v1/gifs/search?q=${query}&limit=20&api_key=dc6zaTOxFJmzC`)
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
      fetch(`https://api.giphy.com/v1/gifs/search?q=${this.state.query}&limit=10&offset=${this.state.offset}&api_key=dc6zaTOxFJmzC`)
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
            loader={<div className="loader">Loading more gifs...</div>}
          >
            {
              (this.state.loading)
              ? "Please enter a search above to see GIFs."
              : <GifList data={this.state.gifs} />
            }
          </InfiniteScroll>
        </div>
        <div className="footer">gifs</div>
      </div>
    );
  }
}

export default App;
