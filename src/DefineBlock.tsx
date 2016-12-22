/**
 * Created by TonyJiang on 16/12/20.
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {TemplateHOCContextDef, TemplateHOCBlockMapDef} from "./hoc";

interface DefineBlockPropDef{
    name: string
}

class DefineBlock extends React.Component<DefineBlockPropDef, any>{

    constructor(props, context){
        super(props, context);

        console.log('arguments ', arguments);
    }

    static contextTypes = {
        blockMap: React.PropTypes.object
    };

    render(){
        const {blockMap} = this.context as TemplateHOCContextDef;
        const {name, children, ...props} = this.props;
        //console.log('context in DefineBlock', name, blockMap);

        var beforeChildren, afterChildren, replaceChildren = children;
        if(blockMap.has(name)){

            //console.log(`DefineBlock named ${name} has been extend`);
            const blockReplace: TemplateHOCBlockMapDef = blockMap.get(name);
            beforeChildren = blockReplace.before;
            replaceChildren = blockReplace.replace || replaceChildren;
            afterChildren = blockReplace.after;

        }

        return (
            <div {...props}>
                {beforeChildren}
                {replaceChildren}
                {afterChildren}
            </div>
        );
    }

}

export {
    DefineBlock, DefineBlockPropDef
}
