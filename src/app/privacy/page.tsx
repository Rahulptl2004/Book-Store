import React from 'react'

const page = () => {
    return (
        <div className='w-full flex justify-center p-9'>
            <div className='w-270 h-auto flex flex-col gap-5'>
                <div>
                    <div className='font-semibold text-3xl py-4'>
                        <h1>Privacy Policy</h1>
                    </div>
                    <div className='font-sans  list-disc uppercase  '>
                        <p className='first-letter:text-2xl text-l text-gray-600'>BookStore is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, then you can be assured that it will only be used in accordance with this privacy statement. BookStore may change this policy from time to time by updating this page.</p>
                    </div>
                    <ul className='list-disc pl-8 uppercase py-2 flex flex-col gap-2  text-gray-600'>
                        <li>
                            Name, Contact information including email address.
                        </li>
                        <li>
                            Demographic information such as postcode, preferences, and interests.
                        </li>
                    </ul>
                </div>

                <div className='uppercase'>
                    <span className='font-semibold'>WHAT WE DO WITH THE INFORMATION WE GATHER</span>
                    <div className='text-gray-600 text-justify'>
                        <p>
                            We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:
                        </p>
                        <ul className='list-disc pl-8 uppercase py-7 flex flex-col gap-2'>
                            <li>We may use the information to improve our products and services.</li>
                            <li>We may periodically send promotional emails about new products, special offers, or other information which we think you may find interesting using the email address which you have provided.</li>
                            <li>From time to time, we may also use your information to contact you for market research purposes. We may contact you by email, phone, fax, or mail. We may use the information to customize the website according to your interests.</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <h1 className='font-semibold text-xl'>SECURITY</h1>
                    <div>
                        <p className='first-letter:text-2xl text-l text-gray-600 uppercase'>We are committed to ensuring that your information is secure. In order to prevent unauthorized access or disclosure, we have put in place suitable physical, electronic, and managerial procedures to safeguard and secure the information we collect online. We don't offer, lease, or credit your personal information to outsiders without your consent. We will disclose your personal information if only required by law or in good faith belief that such actions are necessary for the following circumstances.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
