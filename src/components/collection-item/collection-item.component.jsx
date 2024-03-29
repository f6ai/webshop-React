import React from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom-buttons/custom-buttons.component';
import { addItem } from '../../redux/cart/cart.actions';

import './collection-item.styles.scss';

const CollectionItem = ({ item, addItem }) => {
    const { name, price, imageUrl } = item;
    return (
        <div className='collection-item'>
        <div 
            className='image'
            style={{
                backgroundImage: `url(${imageUrl})`
            }}
            />
        <div className='collection-footer'>
            <span className='name'> {name} </span>
            <span className='price'> {price} </span>
        </div>
        <CustomButton inverted onClick={() => addItem(item)}>Add to cart</CustomButton>
    </div>
    )
};

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
});

// null because we don't use mapStateToProps here
export default connect(null, mapDispatchToProps)(CollectionItem);
