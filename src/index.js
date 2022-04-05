// import partialRight from 'lodash-es/partialRight';
// import { __ } from '@wordpress/i18n';


import {Button,Flex, FlexBlock, FlexItem, TextControl, Icon,PanelBody, PanelRow, ColorPicker,PanelHeader, CheckboxControl,__experimentalBoxControl as BoxControl } from '@wordpress/components';
import {__experimentalDimensionControl as DimensionControl} from '@wordpress/components';
import {InspectorControls, BlockControls, AlignmentToolbar} from '@wordpress/block-editor';

// console.log(partialRight)

// import _ from 'lodash-es';
// import chunk from 'lodash-es/chunk';



wp.blocks.registerBlockType("ourplugin/flexible-star", {
    title: "Flexible Star",
    icon: "star-filled",
    category: "common",
    description: 'Display your custom rating with your custom text and color.',
    attributes: {
        blockBg: {type: 'string', default: '#f1f1f1'},
        paddingSize: {type: 'object', default: [
            {top: '50px'},
            {left: '10%'},
            {right: '10%'},
            {bottom: '50px'}
        ]},
        alignmentEl: {type: 'string', default: 'center'},
        allStars: {type: 'object', default: [
            {id: 1, name: 'star-filled'},
            {id: 2, name: 'star-empty'},
            {id: 3, name: 'star-empty'},
            {id: 4, name: 'star-empty'},
            {id: 5, name: 'star-empty'}
        ]},
        filledStar: {type: 'string', default: '1'},
        starColor: {type: 'string', default: '#000000'},
        labelColor: {type: 'string', default: '#000000'},
        textLabel: {type: 'string', default: 'My overall rating:'},
        ratingTextColor: {type: 'string', default: '#000000'},
        conclusionText: {type: 'boolean', default: true}
    },
    example: {
        attributes: {
            blockBg: '#3c00ff0f',
            blockPadding: '30px 10px',
            alignmentEl: 'center',
            filledStar: '4',
            starColor: '#4400ff',
            labelColor: '#ff0000',
            ratingTextColor: '#ce00ff'
        }
    },
    edit: EditComponent,
    save: function (props) {
      return null;
    }
})

function EditComponent (props) {
    var allExistingStars = props.attributes.allStars.concat([""]);
    for(var i = 0; i < props.attributes.filledStar; i++){
        allExistingStars[i].name = 'star-filled';
    }
    function starFillFunctionality(data){
        let newData = (data > 5) ? 5 : parseInt(data);
        for(var i = 0; i < 5; i++){
            if(i<newData){
                allExistingStars[i].name = 'star-filled';
            }else{
                allExistingStars[i].name = 'star-empty'; 
            }
        }

        newData = newData.toString();
        props.setAttributes({allStars: allExistingStars});
        props.setAttributes({filledStar: newData})
    }

    function changeBlockBg(colorCode){
        props.setAttributes({blockBg: colorCode.hex})
    }

    function changeStarColor(colorCode){
        props.setAttributes({starColor: colorCode.hex})
        console.log(props.attributes.starColor)
    }

    function changeLabelColor(colorCode){
        props.setAttributes({labelColor: colorCode.hex})
    }

    function changeRatingTextColor(colorCode){
        props.setAttributes({ratingTextColor: colorCode.hex})
    }

    function customizeLabelText(value){
        props.setAttributes({textLabel: value})
    }

    function conclusionTextLogic(value){
        props.setAttributes({conclusionText: value})
    }

    function updateSpacing(x){
        props.setAttributes({paddingSize: x})
        console.log(props.attributes.paddingSize)
    }

    return (
        [
            <>
                <BlockControls>
                    <AlignmentToolbar value={props.attributes.alignmentEl} onChange={x => props.setAttributes({alignmentEl: x})}/>
                </BlockControls>
                <InspectorControls>
                    <PanelBody title="Wrapper Style">
                        <p>Block Background Color</p>
                        <PanelRow>
                            <ColorPicker color={props.attributes.blockBg} defaultValue={props.attributes.blockBg} onChangeComplete={(x) => changeBlockBg(x)}/>
                        </PanelRow>  

                        <PanelRow>
                            <p>Padding</p>
                        </PanelRow>
                        <BoxControl
                onChange = {(x) => {updateSpacing(x)}}
            />
                    </PanelBody>
                    <PanelBody title="Star Customizations" initialOpen={false}>
                        <PanelRow>
                            <TextControl label="How many stars you want to fill in?" type="number" onChange={(value) => {starFillFunctionality(value)}} min="1" max="5" value={props.attributes.filledStar}/>
                        </PanelRow> 
                        <PanelRow>
                            <p>Star Color</p>
                        </PanelRow>
                        <ColorPicker label="Star Color" color={props.attributes.starColor} defaultValue={props.attributes.starColor} onChangeComplete={(x) => changeStarColor(x)}/>
                    </PanelBody>
                    <PanelBody title="Label Text" initialOpen={false}>
                        <TextControl value={props.attributes.textLabel} onChange={(value) => {customizeLabelText(value)}}/>
                        <PanelRow>
                            <p>Label Text Color</p>
                        </PanelRow>
                        <ColorPicker color={props.attributes.labelColor} defaultValue={props.attributes.labelColor} onChangeComplete={(x) => changeLabelColor(x)}/>
                    </PanelBody>
                    <PanelBody title="Rating Text" initialOpen={false}>
                        <PanelRow>
                            <CheckboxControl
                                label="Show Text"
                                help="Is the text is visible or not?"
                                checked={ props.attributes.conclusionText }
                                onChange={(value) => {conclusionTextLogic(value)}}
                            />
                        </PanelRow>
                        <PanelRow>
                            <p>Rating Text Color</p>
                        </PanelRow>
                        <ColorPicker color={props.attributes.ratingTextColor} defaultValue={props.attributes.ratingTextColor} onChangeComplete={(x) => changeRatingTextColor(x)}/>
                    </PanelBody>
                </InspectorControls>
            </>
            ,
            <p className="flexibleStarBlock" style={{justifyContent: props.attributes.alignmentEl, backgroundColor: props.attributes.blockBg, padding: props.attributes.blockPadding}}>
                <span style={{color: props.attributes.labelColor}}>
                    {
                        props.attributes.textLabel ? props.attributes.textLabel : ''
                    }
                </span>
                <span style={{margin: "0 20px"}}>
                    {
                        props.attributes.allStars.map(({ id, name }) => (
                            <Icon className="flexibleStarBlock__icon" ind={id} icon={name} style={{color: props.attributes.starColor}} />
                        ))
                    }
                </span>
                {
                
                    props.attributes.conclusionText ? <span style={{color: props.attributes.ratingTextColor}}><strong>{props.attributes.filledStar}</strong> out of <strong>5</strong></span> : ''
                }
            </p> 
        ]
    )
}

