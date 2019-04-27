import React, { Component } from 'react';
import { string, number, shape } from 'prop-types';
import { Query } from 'src/drivers';
import classify from 'src/classify';
import { loadingIndicator } from 'src/components/LoadingIndicator';
import defaultClasses from './vendorList.css';
import VendorTile from './vendorTile';
import VendorListQuery from '../../queries/getVendorList.graphql';

class VendorList extends Component {
    static propTypes = {
        id: number,
        title: string,
        classes: shape({
            root: string,
            header: string,
            content: string
        })
    };

    get header() {
        const { title, classes } = this.props;

        return title ? (
            <div className={classes.header}>
                <h2 className={classes.title}>
                    <span>{title}</span>
                </h2>
            </div>
        ) : null;
    }
 
    mapVendor(vendorItem) {
        const { items } = vendorItem.productImagePreview;
        return {
            ...vendorItem,
            productImagePreview: {
                items: items.map(item => {
                    const { small_image } = item;
                    return {
                        ...item,
                        small_image:
                            typeof small_image === 'object'
                                ? small_image.url
                                : small_image
                    };
                })
            }
        };
    }

    render() {
        const { id, classes } = this.props;

        return (
            <div className={classes.root}> 
                {this.header}
                <Query query={vendorListQuery} variables={{ id }}>
                    {({ loading, error, data }) => {
                        if (error) {
                            return (
                                <div className={classes.fetchError}>
                                    Data Fetch Error: <pre>{error.message}</pre>
                                </div>
                            );
                        }
                        if (loading) {
                            return loadingIndicator;
                        }
                        if (data.vendor.children.length === 0) {
                            return (
                                <div className={classes.noResults}>
                                    No child categories found.
                                </div>
                            );
                        }
                        
                        return (
                            <div className={classes.content}>
                                {data.vendor.children.map(item => (
                                    <VendorTile
                                        item={this.mapVendor(item)}
                                        key={item.url_key}
                                    />
                                ))}
                            </div>
                        );
                    }}
                </Query>
            </div>
        );
    }
}

export default classify(defaultClasses)(VendorList);
