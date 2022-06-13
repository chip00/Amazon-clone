import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css';
import { getBasketTotal } from './reducer';
import { useStateValue } from './StateProvider';
import axios from './axios';


function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();

    const navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
            //generate the special stripe secret which allows us to charge a 
            //customer
            const  getClientSecret = async () => {
                const response = await axios({
                    method: 'post',
                    //Stripe expects the total in a currencies subunits
                    url: `/payments/create?total=${getBasketTotal(basket) * 100}`
                });
                setClientSecret(response.data.clientSecret)
            } 
            
            getClientSecret();

    }, [basket])

    console.log('THE SECRET IS >>', clientSecret)

    const handleSumbit = async (event) => {
        //do some fancy stripe
        event.preventDefault();
        setProcessing(true); // this command esentially doesnt allow you to press
        //the buy button 5 times. Your press it once and it disables

       // const payload = await stripe

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
        //paymentIntent = payment confirmation
            setSucceeded(true);
            setError(null)
            setProcessing(false)

            navigate('/orders', { replace: true })
        })
    }

    const handleChange = event => {
        // Listen for changes in the CardElement
        // and dpslay any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");

       
    }

  return (
    <div className='payment'>
        <div className='payment__container'>
            <h1>
                Checkout (
                    <Link to="/checkout">{basket?.length} items</Link>
                    )
            </h1>

            {/* Payment section - delivery adress */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Delivery address</h3>
                </div>
                <div className='payment__address'>
                    <p>{user?.email}</p>
                    <p>123 React Lane</p>
                    <p>Los Angeles, CA</p>
                </div>
            </div>
            {/* Payment section - Review Items */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Review items and delivery</h3>
                </div>
                <div className='payment__items'>
                    {basket.map(item => (
                        <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                        />
                    ))}
                </div>
            </div>


            {/* Payment section - Payment method */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Payment Method</h3>
                </div>
                    <div className="payment__details">
                            {/* stripe magic will go here*/}

                            <form  onSumbit={handleSumbit}>
                                <CardElement onChange={handleChange} />
                                <div className='payment__priceContainer'>
                                    <CurrencyFormat
                                        renderText={(value) => (
                                            <h3>Order Total: {value}</h3>
                                        )}
                                        decimalScale={2}
                                        value={getBasketTotal(basket)}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"€"}
                                    />
                                    <button disabled={processing || disabled || succeeded}>
                                        <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                    </button>


                                </div>
                                {/* Errors */}
                                {error && <div>{error}</div>}
                            </form>
                    </div>
            </div>
        </div>

    </div>
  )
}

export default Payment