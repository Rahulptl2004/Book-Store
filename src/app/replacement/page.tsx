import React from 'react'

const page = () => {
    return (
        <div className='w-full flex justify-center p-9 text-justify'>
            <div className='w-270 h-auto flex flex-col gap-5'>
                <div className='font-semibold text-2xl'>
                    <h1>RETURN & REPLACEMENT</h1>
                </div>
                <div>
                    <span className='font-semibold'>Refund and Returns Policy</span>
                    <p className='text-gray-500'>Only if the books are damaged then our Return/Replacement/Refund policy be applicable. It is valid for three days. We are unable to offer you a refund or exchange after 3 days have passed since delivery.</p>
                </div>

                <div>
                    <p className='text-gray-500'>The consumer is required to record a brief video of the order being unpacked. The unpacking video is mandatory if the consumer wants to return/replace or refund.</p>
                    <p className='text-gray-500'>Customers without any of the videos will not be eligible for any refund from us.</p>
                </div>
                <div className='text-gray-500'>
                    <p className='font-semibold'>Damages covered under refund/return/replacement policy only include:</p>
                    <ul className='list-disc pl-9'>
                        <li>Severe spine damages, due to which pages are coming apart</li>
                        <li>In transit damages [corner bents/little dents/cover scratches do not come under this]</li>
                        <li>More than 2 pages are misprinted.</li>
                        <li>Smudge making the pages unreadable. There should be more than 2 pages like this to qualify for replacement.</li>
                    </ul>
                </div>
                <div className='text-gray-500'>
                    <p>PS: Sets like Harry Potter/Lord Of The Rings include boxes, which is delicate and might get damaged in transit. Our return/refund/replacement policy does not cover the damages if any to the outer box. If books are damaged, it will come under our policy.</p>
                </div>
                <div className='flex flex-col gap-2'>
                    <p className='font-semibold'>
                        In addition to the aforementioned problems, a Reshipment/Refund will be granted in cases of "Missing Book" or "Wrong Book Delivered" cases.
                        This one as well requires the unpacking video.
                    </p>
                    <p className='text-gray-500'>Only if the books are damaged then our Return/Replacement/Refund policy be applicable. It is valid for three days. We are unable to offer you a refund or exchange after 3 days have passed since delivery.</p>
                    <p className='text-gray-500'>Return/Replacement Process time 7-14 Days.</p>
                    <p className='text-gray-500'>For online payment, refunds will be made in the same form in which the payment is received. For COD orders refund will be made by UPI/Bank Transfer in the name of the Customer. In the case of COD orders, we may ask customers for their UPI ID via sms/mail/call to initiate a return.</p>
                    <p className='text-gray-500'>Our courier boy will pick up the "Returned Book" from the customer’s doorstep. We will pay the shipping costs for returning the book.Customers will receive a full refund in situations where a package is returned to us by the courier or not delivered due to one of their reasons. Customers are requested to drop in a message on <span className='font-semibold text-black'> 82007xxxx</span> [WhatsApp] to claim returns/refunds/replacements.</p>
                    <h2 className='font-semibold'>For outright cancellations by you :</h2>
                    <p className='text-gray-500'>- On receipt of the cancellation notice we shall cancel the order and refund the entire amount if the order has not been processed by us.</p>
                    <p className='text-gray-500'>Cancellation of the order can't be made/accepted once the products under your order are released for dispatch/ shipped out from our delivery location. In such cases, a replacement request can be initiated post receipt of the products.</p>
                    <p className='text-gray-500'>In case of cancellation before shipment, the amount shall be refunded to you through the same mode of payment (in case of Prepaid) or via credit to your store credit account (in case of COD) which can be used for subsequent purchases.</p>
                </div>
                <div className='[&>p]:text-gray-500 flex flex-col gap-4'>
                    <h2 className='font-semibold '>Cancellations by Bookstore :</h2>
                    <p>
                        In some cases,Bookstore will cancel orders and refund full payment to the customers. Those reasons are given below.
                    </p>
                    <ul className='list-decimal pl-9 text-gray-500'>
                        <li>If there is any kind of stock issue on the latest edition.</li>
                        <li>If the product is in damaged condition.</li>
                        <li>If there is any delivery issue in the customer's location at that time (e.g Lockdown, Strikes).</li>
                    </ul>
                    <h2 className='font-semibold '>Late or missing refunds</h2>
                    <ul className='list-decimal pl-9 text-gray-500'>
                        <li>If you haven’t received a refund yet, first check your bank account statement again.</li>
                        <li>Then check for mail you have received from Razorpay to track your refund.</li>
                        <li>If you’ve done this and you still have not received your refund yet, please get in touch with us.
                        </li>
                    </ul>
                </div>
                <div className='font-semibold '>
                    <p>BOOKSTORE HAS EVERY RIGHT TO DECIDE THE COMPENSATION METHOD. THE REFUNDS WILL BE PROCESSED IMMEDIATELY IF THE ISSUE IS GENUINE</p>
                </div>
                <div>
                    <h2 className='font-semibold'>Need help?</h2>
                    <p className='text-gray-500'>Contact us at bookstore.in@gmail.com or 82007xxxx for questions related to refunds and returns.</p>
                </div>
            </div>
        </div>
    )
}

export default page
