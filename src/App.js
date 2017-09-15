import React, { Component } from 'react';
import GifList from './GifList';
import SearchForm from './SearchForm';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gifs: [],
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
      console.log('Search data fetched.')
      this.setState({ 
        gifs: responseData.data,
        loading: false
      });
    })
    .catch(e => {
      console.log('Error fetching search data: '+e);
    });  
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <h1>gif search</h1>
          <SearchForm onSearch={this.performSearch} />
        </div>
        {
          (this.state.loading)
          ? <div style={{padding:'180px', borderTop:'100px solid teal'}} >Please enter a search above to see GIFs.</div>
          : <div id="gifs"><GifList data={this.state.gifs} >Loading...</GifList></div>
        }        
        <div className="footer">gifs</div>
      </div>
    );
  }
}

export default App;
