import React, { useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import Card from 'components/Card';
import CardBody from 'components/CardBody';
import Cover from 'components/Covers';
import services from 'services';
import useLifecycleMethods from 'helpers/useLifecycleMethods.helpers';

const { ProductService } = services;

const ProductType = ({ ...props }) => {
	const { Product } = useSelector((state) => ({
		Product: state.Product.data,
	}));
	const dispatch = useDispatch();
	const products = Product.map((item, key) => {
		return {
			id: item.id,
			title: item.name,
			icon: 'local_mall',
			description: '',
		};
	});

	const initialProduct =
		props.selectedProduct !== undefined ? props.selectedProduct : products[0];
	const [selectedProduct, setSelectedProduct] = useState(initialProduct);

	const { componentDidMount } = useLifecycleMethods();

	componentDidMount(() => {
		dispatch(ProductService.fetchData());
	});

	const handleProductChange = (product) => {
		setSelectedProduct(product);
		props.change('product', product);
	};

	const onSelectProduct = (product) => {
		handleProductChange(product);
	};

	return (
		<Card>
			<CardBody>
				<Cover
					covers={products}
					selectedCover={selectedProduct}
					onSelectCover={onSelectProduct}
				/>
			</CardBody>
		</Card>
	);
};

const form = reduxForm({
	form: 'product',
	destroyOnUnmount: false,
})(ProductType);

const selector = formValueSelector('product');

export default connect((state) => ({
	selectedProduct: selector(state, 'product'),
}))(form);
