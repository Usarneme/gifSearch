import React from 'react'

const Gif = props => {
    return(
        <li className="gifWrap">
            <img src={props.url} alt="" />
        </li>
    )
}

export default Gif