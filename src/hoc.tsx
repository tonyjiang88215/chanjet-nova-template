/**
 * Template High Order Component
 * 用于将一个ReactComponent封装成为Template. 被封装后, 可以再组件内定义DefineBlock, 用于内部扩展使用.
 *
 * Created by TonyJiang on 16/12/20.
 */

import * as React from 'react';
import {ReactElement} from "react";
import {ExtendBlock} from "./ExtendBlock";

interface TemplateHOCPropDef {

}

interface TemplateHOCStateDef {

}


interface TemplateHOCContextDef {
    blockMap: Map<string, TemplateHOCBlockMapDef>;
}

interface TemplateHOCBlockMapDef {
    replace: ReactElement<any>;
    before: Array<ReactElement<any>>;
    after: Array<ReactElement<any>>;
}

const template = (WrappedComponent) => {
    console.log(WrappedComponent);

    const blockMap = new Map<string, TemplateHOCBlockMapDef>();

    return class TemplateHOCWRapper extends React.Component<TemplateHOCPropDef, TemplateHOCStateDef> {

        static contextTypes = {
            blockMap: React.PropTypes.object
        }

        static childContextTypes = {
            blockMap: React.PropTypes.object
        }

        getChildContext() {
            console.log('getChildContext' , WrappedComponent.name , blockMap);
            return {blockMap};
        }

        constructor(props, context) {
            super(props, context);
            console.log('context in hoc', WrappedComponent.name ,  context);

            this.extendBlockInit(props);
        }

        componentWillReceiveProps(nextProps, nextContext){
            this.extendBlockInit(nextProps);
        }

        extendBlockInit(props) {
            blockMap.clear();

            const childElements = props.children;
            //console.log('childElements', props.children);
            if (childElements !== undefined) {
                if (childElements instanceof Array) {
                    childElements.map((childComponent: ReactElement<any>) => {
                        if (childComponent['type'] == ExtendBlock) {
                            //console.log('props in childComponent', childComponent);
                            this.updateBlockDefine(childComponent.props);

                        }
                    })
                } else {
                    if (childElements['type'] == ExtendBlock) {
                        console.log('get one extendBlock');
                        this.updateBlockDefine((childElements as ReactElement<any>).props);
                    }
                }
            }


        }

        updateBlockDefine(props){
            const {name, children, before, after} = props;

            var blockReplace: TemplateHOCBlockMapDef = {
                replace: null,
                before: [],
                after: []
            };
            if(blockMap.has(name)){
                blockReplace = blockMap.get(name);
            }

            if(before){
                blockReplace.before.push(children);
            }else if(after){
                blockReplace.after.push(children);
            }else{
                blockReplace.replace = children;
            }

            blockMap.set(name, blockReplace);
        }

        // static childContextTypes = {
        //     blockMap: React.PropTypes.object
        // }
        //
        // getChildContext(){
        //     return {
        //         blockMap: new Map<string, React.Component<any, any>>()
        //     }
        // }




        render() {
            return <WrappedComponent {...this.props} />
        }
    }
}

export {template, TemplateHOCContextDef, TemplateHOCBlockMapDef};