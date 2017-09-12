import React from 'react'
import Gif from './Gif'

const GifList = props => {
    const results = props.data
    let gifs;
    
    if(results.length > 0) {
        gifs = results.map(gif => 
            <Gif url={gif.images.fixed_height.url} key={gif.id} />
        )
    } else {
        gifs = <div className="noGifs">Sorry, your search didn't result in any GIFs.</div>
    }

    return (
        <ul className="gifList">
            {gifs}
        </ul>
    )
}

export default GifList