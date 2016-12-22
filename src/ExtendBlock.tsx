/**
 * Created by TonyJiang on 16/12/20.
 */
import * as React from 'react';
import {TemplateHOCContextDef} from "./hoc";

interface ExtendBlockPropDef{
    name: string
}

class ExtendBlock extends React.Component<ExtendBlockPropDef, any>{

    static propTypes = {
        name: React.PropTypes.string.isRequired
    };

    render(){
        return null;
    }

}

export {
    ExtendBlock, ExtendBlockPropDef
}