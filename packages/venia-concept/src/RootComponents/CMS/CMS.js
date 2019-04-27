import React, { Component } from 'react';
import CategoryList from 'src/components/CategoryList';
import CmsBlock from 'src/components/CmsBlock';

export default class CMS extends Component {
    render() {
        return  <React.Fragment>
        <CmsBlock identifiers={"pwa-eco-friendly-block"}/>
        <CategoryList title="Shop by category" id={2} /> 
        <CmsBlock identifiers={"pwa-training-block"}/>
        <CmsBlock identifiers={"pwa-product-listing"}/>
        <CmsBlock identifiers={"pwa-product-listing"}/>
         
      </React.Fragment>;
    }
}
