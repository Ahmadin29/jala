import * as React from 'react';
import { Text as NativeText } from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../Helper/Colors';

export default function Text(props) {

    let typeface    = props.family ? props.family : "source";
    let font        = props.weight ? props.weight : "regular";

    const family    = typeface+'-'+font;
    
    const size      = props.size    ? props.size    : 14;
    const color     = props.color   ? props.color   : Colors.textColor;
    const copy      = props.copy    ? true          : false


    return(
        <NativeText 
            {...props}
            numberOfLines={props.elipsis ? props.elipsis : 0}
            style={[
                    props.style,
                    {
                        fontSize:size,
                        fontFamily:family,
                        color:color
                    }
                ]
            }
            selectable={copy}
        />
    );
}

Text.propTypes = {
    family  : PropTypes.string,
    weight  : PropTypes.string,
    size    : PropTypes.number,
    elipsis : PropTypes.number,
    style   : PropTypes.object,
    bold    : PropTypes.bool,
    semi    : PropTypes.bool,
    color   : PropTypes.string,
    copy    : PropTypes.bool
};