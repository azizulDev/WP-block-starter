
import React from 'react'
import ReactDOM from 'react-dom'

import {Icon} from '@wordpress/components';

console.log('icon found in front end',<Icon />)


const divsToUpdate = document.querySelectorAll(".pickPlugins-flexibleStar");

divsToUpdate.forEach(function(div){
    let data = div.querySelector("pre").innerHTML
    data = JSON.parse(data)
    ReactDOM.render(<FlexibleBlock {...data} />, div)
    div.classList.remove("pickPlugins-flexibleStar")
})

function FlexibleBlock(props){
    let paddingObj = props.paddingSize;
    let blockPaddingStyleObj = {};



    // Object.keys(paddingObj).forEach(key => {
    //     paddingObj = "padding-" + key + ":" + paddingObj[key];
    // });



    let styleOne = {justifyContent: props.alignmentEl, backgroundColor: props.blockBg}
    let styleTwo = {color: 'pink'}

    // let xx = blockPaddingStyleObj.map((z) => {
    //     return
    // })
    console.log('new objj ', paddingObj)

    return(
        <p className="flexibleStarBlock" style={{...styleOne}}>
            <span style={{color: props.labelColor}}>
                {
                    props.textLabel ? props.textLabel : ''
                }
            </span>
            <span style={{margin: "0 20px"}}>
                {
                    props.allStars.map(({ id, name }) => (
                        <Icon className="flexibleStarBlock__icon" ind={id} icon={name} style={{color: props.starColor}} />
                    ))
                }
            </span>
            {
            
                props.conclusionText ? <span style={{color: props.ratingTextColor}}><strong>{props.filledStar}</strong> out of <strong>5</strong></span> : ''
            }
        </p>
    )
}