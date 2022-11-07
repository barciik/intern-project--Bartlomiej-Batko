import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart, removeFromCart } from '../store';
import checkoutStyles from './Checkout.module.css';

class Checkout extends Component {
	calculate() {
		
		let totalPrice = 0
		for (let i = 0; i < this.props.cart.length; i++) {
			console.log(this.props.cart[i].prices.find(el => el.currency.symbol === this.props.currency).amount)
			totalPrice += this.props.cart[i].prices.find(el => el.currency.symbol === this.props.currency).amount
		}
		return totalPrice
	}

	render() {
		return (
			<div className={checkoutStyles.cartBody}>
				<h3 className={checkoutStyles.title}>CART</h3>
				<div className={checkoutStyles.cartItems}>
					{this.props.cart.map((item) => {
						return (
							<div key={item.id} className={checkoutStyles.cartItem}>
								<div className={checkoutStyles.itemInfo}>
									<h4 className={checkoutStyles.name}>{item.name}</h4>
									<h5 className={checkoutStyles.brand}>{item.brand}</h5>
									<p className={checkoutStyles.price}>
										{this.props.currency}
										{(
											item.prices.find(
												(el) => el.currency.symbol === this.props.currency
											).amount * item.quantity
										).toFixed(2)}
									</p>
									<div className={checkoutStyles.attrBox}>
										{item.attributes &&
											item.attributes.map((el) => {
												if (el.id.toLowerCase() === 'color') {
													return (
														<div
															key={el.id}
															className={checkoutStyles.attributes}
														>
															<p className={checkoutStyles.attrTitle}>
																Color:{' '}
															</p>
															<div className={checkoutStyles.colors}>
																{el.items.map((attr) => {
																	return (
																		<div
																			key={attr.value}
																			className={checkoutStyles.color}
																			style={{
																				backgroundColor: `${attr.value}`,
																			}}
																		></div>
																	);
																})}
															</div>
														</div>
													);
												} else {
													return (
														<div
															key={el.id}
															className={checkoutStyles.attributes}
														>
															<p className={checkoutStyles.attrTitle}>
																{el.id}:{' '}
															</p>
															<div className={checkoutStyles.sizes}>
																{el.items.map((attr) => {
																	return (
																		<p
																			key={attr.value}
																			className={checkoutStyles.size}
																		>
																			{attr.value}
																		</p>
																	);
																})}
															</div>
														</div>
													);
												}
											})}
									</div>
								</div>
								<div className={checkoutStyles.rightInfo}>
									<div className={checkoutStyles.cartButtons}>
										<button
											onClick={() => {
												this.props.addToCart(item);
											}}
										>
											+
										</button>
										<p>{item.quantity}</p>
										<button
											onClick={() => {
												this.props.removeFromCart(item);
											}}
										>
											-
										</button>
									</div>
									<div className={checkoutStyles.itemImg}>
										<img src={item.gallery[0]} alt={item.name}></img>
									</div>
								</div>
							</div>
						);
					})}
				</div>
				<div className={checkoutStyles.priceInfo}>
					<p className={checkoutStyles.tax}>
						Tax 21%: <span>{this.props.currency}{(this.props.totalPrice / 100 * 21).toFixed(2)}</span>
					</p>
					<p className={checkoutStyles.quantity}>
						Quantity: <span>{}</span>
					</p>
					<p className={checkoutStyles.total}>
						Total: <span>
							{this.props.currency}
							{this.props.totalPrice.toFixed(2)}
						</span>
					</p>
					<button className={checkoutStyles.orderBtn}>ORDER</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	cart: state.cart.cart,
	currency: state.cart.currency,
	totalPrice: state.cart.totalPrice
});

const mapDispatchToProps = { addToCart, removeFromCart };

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
