'use client';
import { useState } from 'react';

import Link from "next/link"




export default function Contact(){
    const [message, setMessage] = useState('');
    const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    agree: false
  });

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const target = e.target as HTMLInputElement;
  const { name, type, value } = target;
  const fieldValue = type === "checkbox" ? target.checked : value;

  setForm((prev) => ({
    ...prev,
    [name]: fieldValue,
  }));
};




  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

    if (!form.agree) {
      alert("Please agree to the terms and privacy policy.");
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
         setMessage('✅ Message Sent Successfully. Our Team will contact you shortly!');
      } else {
        console.error(await res.text());
        setMessage('❌ Failed to send message.');
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Network error. Please try again later.");
    }
  };

    return(
  
                  <div>
                        <div className="page-header pt-30 background-body">
                            <div className="custom-container position-relative mx-auto">
                                <div className="bg-overlay rounded-12 overflow-hidden">
                                    <img className="w-100 h-100 rounded-12 img-banner" src="/assets/imgs/page-header/banner2.webp" alt="Contact Us-Best Car Rental Dubai " />
                                </div>
                                <div className="container position-absolute z-1 top-50 start-50 translate-middle">
                                    <h2 className="text-white">Get in touch</h2>
                                </div>
                            </div>
                        </div>
                        <section className="box-section background-body pt-110">
                            <div className="container">
                                <div className="text-start">
                                    <h4 className="neutral-1000">Our Branches</h4>
                                </div>
                                <div className="row mt-30">
                                    <div className="col-lg-6 col-sm-6">
                                        <div className="card-contact">
                                            <div className="card-image">
                                                <div className="card-icon">
                                                    <svg className="invert" xmlns="http://www.w3.org/2000/svg" width={36} height={36} viewBox="0 0 36 36" fill="none">
                                                        <g clipPath="url(#clip0_389_17454)">
                                                            <path d="M35.8681 19.8053C35.3789 17.6848 33.487 16.0223 31.4116 15.5264L27.3126 14.5435L23.6493 10.8098C22.1193 9.25148 19.9894 8.35767 17.8059 8.35767H4.1168C3.84616 8.35767 3.59951 8.51299 3.48258 8.75718C3.36572 9.00131 3.39926 9.29078 3.56899 9.50165L4.40557 10.5412C4.46407 10.6138 4.45472 10.7185 4.38427 10.7797L0.772875 13.9159C0.619102 14.0495 0.530789 14.2432 0.530789 14.4469V18.293L0.0819844 19.139C0.028125 19.2404 0 19.3536 0 19.4684V22.2613C0 22.4002 0.0411328 22.5359 0.118195 22.6515L1.18062 24.2441C1.31105 24.4395 1.53056 24.557 1.76555 24.557H2.98962C3.32023 26.311 4.86281 27.6423 6.71147 27.6423C8.56013 27.6423 10.1026 26.311 10.4333 24.557H14.0502C14.4385 24.557 14.7533 24.2421 14.7533 23.8538C14.7533 23.4656 14.4385 23.1507 14.0502 23.1507H10.4343C10.1012 21.3839 8.50444 20.0658 6.7114 20.0658C4.91646 20.0658 3.32114 21.3859 2.98828 23.1507H2.14172L1.40625 22.0482V19.6434L1.85513 18.7974C1.90898 18.6959 1.93711 18.5827 1.93711 18.4678V14.7674L5.30641 11.8414C5.91729 11.3109 6.02564 10.4211 5.57852 9.76385H17.8059C19.6145 9.76385 21.3786 10.5041 22.6457 11.7948L26.4503 15.6725C26.5427 15.7667 26.6598 15.8329 26.7882 15.8638L31.0842 16.894C31.3504 16.9576 31.6076 17.0444 31.8557 17.151L31.3502 17.4759C30.8563 17.7928 30.5613 18.3331 30.5613 18.9213C30.5613 19.8569 31.3433 20.6392 32.2791 20.6392H34.58C34.5882 20.7355 34.5938 20.8322 34.5938 20.9288V22.0744L33.9784 23.1507H31.062C30.7296 21.3853 29.134 20.0658 27.3393 20.0658C25.5445 20.0658 23.9504 21.3862 23.6167 23.1507H20.2371C19.8489 23.1507 19.534 23.4656 19.534 23.8538C19.534 24.2421 19.8489 24.557 20.2371 24.557H23.6176C23.9482 26.311 25.4908 27.6423 27.3394 27.6423C29.188 27.6423 30.7306 26.311 31.0613 24.557H34.3865C34.6388 24.557 34.8716 24.4218 34.9969 24.2029L35.9075 22.6103C35.9682 22.504 36.0001 22.3837 36.0001 22.2613V20.9288C36 20.5496 35.9552 20.1698 35.8681 19.8053ZM6.71147 26.2361C5.39803 26.2361 4.32949 25.1676 4.32949 23.854C4.32949 22.5585 5.41512 21.4724 6.7114 21.4724C8.00754 21.4724 9.09345 22.5569 9.09345 23.854C9.09345 25.1675 8.02484 26.2361 6.71147 26.2361ZM27.3393 26.2361C26.0264 26.2361 24.9583 25.1684 24.9574 23.8557C24.9574 23.8551 24.9574 23.8545 24.9574 23.8538C24.9574 22.5407 26.026 21.4724 27.3396 21.4724C28.6528 21.4724 29.7211 22.5407 29.7211 23.8538C29.7211 23.8548 29.7212 23.8557 29.7212 23.8567C29.7198 25.1689 28.6519 26.2361 27.3393 26.2361ZM32.0581 19.1405C31.9222 19.0049 31.9468 18.764 32.1101 18.6593L33.1586 17.9853C33.557 18.3418 33.8989 18.7621 34.1534 19.2329H32.2791C32.1673 19.2329 32.0933 19.1756 32.0581 19.1405Z" fill="black" />
                                                            <path d="M22.9904 16.7172C23.8057 16.7172 24.2563 15.7207 23.7177 15.1073L21.8872 13.022C20.7203 11.6928 19.0366 10.9304 17.2677 10.9304H8.90511C8.51628 10.9304 8.1451 11.0759 7.86013 11.3401L5.35771 13.6585C5.07554 13.92 4.97443 14.3238 5.10015 14.6873C5.2258 15.0506 5.55458 15.3055 5.93778 15.3368C9.21259 15.604 20.1148 16.4928 22.9123 16.7142C22.9384 16.7162 22.9644 16.7172 22.9904 16.7172ZM8.81589 12.3715C8.84021 12.349 8.87186 12.3366 8.90511 12.3366H14.5077V14.6239C11.6837 14.3942 8.84619 14.163 7.04113 14.0158L8.81589 12.3715ZM15.9139 14.7381V12.3366H17.2676C18.6317 12.3366 19.9303 12.9246 20.8303 13.9496L21.9512 15.2267C20.4923 15.1096 18.27 14.9295 15.9139 14.7381Z" fill="black" />
                                                            <path d="M15.2109 19.3711H16.7835C17.1718 19.3711 17.4866 19.0562 17.4866 18.668C17.4866 18.2797 17.1718 17.9648 16.7835 17.9648H15.2109C14.8226 17.9648 14.5078 18.2797 14.5078 18.668C14.5078 19.0562 14.8227 19.3711 15.2109 19.3711Z" fill="black" />
                                                            <path d="M5.7627 16.9875C5.37436 16.9875 5.05957 17.3024 5.05957 17.6907C5.05957 18.0789 5.37436 18.3938 5.7627 18.3938H7.3353C7.72364 18.3938 8.03843 18.0789 8.03843 17.6907C8.03843 17.3024 7.72364 16.9875 7.3353 16.9875H5.7627Z" fill="black" />
                                                            <path d="M17.8625 23.5848C17.7471 23.3083 17.4607 23.1304 17.1614 23.1528C16.8677 23.1748 16.615 23.3833 16.5359 23.6665C16.3681 24.2681 17.042 24.7733 17.5743 24.4567C17.8708 24.2803 17.9926 23.9027 17.8625 23.5848Z" fill="black" />
                                                        </g>
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="card-info">
                                                <div className="card-title mb-">
                                                    <Link className="title heading-6" href="#">Malaysia</Link>
                                                </div>
                                                <div className="card-method-contact">
                                                    <div className="d-flex align-items-start mb-2">
                                                        <div className="icon">
                                                            <svg className="invert" xmlns="http://www.w3.org/2000/svg" width={18} height={19} viewBox="0 0 18 19" fill="none">
                                                                <path d="M9 1.0625C7.35897 1.0625 5.78516 1.7144 4.62478 2.87478C3.4644 4.03516 2.8125 5.60897 2.8125 7.25C2.8125 10.5181 8.325 17.4312 8.56125 17.7294C8.61396 17.7951 8.68074 17.8481 8.75668 17.8845C8.83262 17.921 8.91577 17.9399 9 17.9399C9.08423 17.9399 9.16738 17.921 9.24332 17.8845C9.31925 17.8481 9.38604 17.7951 9.43875 17.7294C9.675 17.4312 15.1875 10.5181 15.1875 7.25C15.1875 5.60897 14.5356 4.03516 13.3752 2.87478C12.2148 1.7144 10.641 1.0625 9 1.0625ZM9 16.4637C7.26188 14.2137 3.9375 9.4325 3.9375 7.25C3.9375 5.90734 4.47087 4.61967 5.42027 3.67027C6.36967 2.72087 7.65734 2.1875 9 2.1875C10.3427 2.1875 11.6303 2.72087 12.5797 3.67027C13.5291 4.61967 14.0625 5.90734 14.0625 7.25C14.0625 9.4325 10.7381 14.2025 9 16.4637Z" fill="#101010" />
                                                                <path d="M9 3.3125C8.33249 3.3125 7.67997 3.51044 7.12495 3.88129C6.56994 4.25214 6.13735 4.77924 5.88191 5.39594C5.62646 6.01264 5.55963 6.69124 5.68985 7.34593C5.82008 8.00062 6.14151 8.60198 6.61352 9.07399C7.08552 9.54599 7.68689 9.86743 8.34157 9.99765C8.99626 10.1279 9.67486 10.061 10.2916 9.80559C10.9083 9.55015 11.4354 9.11757 11.8062 8.56255C12.1771 8.00753 12.375 7.35501 12.375 6.6875C12.375 5.79239 12.0194 4.93395 11.3865 4.30101C10.7536 3.66808 9.89511 3.3125 9 3.3125ZM9 8.9375C8.55499 8.9375 8.11998 8.80554 7.74997 8.55831C7.37996 8.31107 7.09157 7.95967 6.92127 7.54854C6.75098 7.1374 6.70642 6.685 6.79323 6.24855C6.88005 5.81209 7.09434 5.41118 7.40901 5.09651C7.72368 4.78184 8.12459 4.56755 8.56105 4.48073C8.99751 4.39392 9.4499 4.43847 9.86104 4.60877C10.2722 4.77907 10.6236 5.06746 10.8708 5.43747C11.118 5.80748 11.25 6.24249 11.25 6.6875C11.25 7.28424 11.0129 7.85653 10.591 8.27849C10.169 8.70045 9.59674 8.9375 9 8.9375Z" fill="#101010" />
                                                            </svg>
                                                        </div>
                                                        <Link className="location text-md-medium ms-2" href="https://www.google.com/maps/dir//Cova+Square,+Kota+Damansara,+47810+Petaling+Jaya,+Selangor,+Malaysia/@3.1478156,101.4925279,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x31cdcaabe40706dd:0xba5c2e7770e8baba!2m2!1d101.5749299!2d3.1478188?entry=ttu&g_ep=EgoyMDI1MDQyMy4wIKXMDSoASAFQAw%3D%3D">Cova Square, Kota Damansara, 47810 Petaling Jaya, Selangor, Malaysia</Link>
                                                    </div>
                                                    <div className="d-flex align-items-start mb-2">
                                                        <div className="icon">
                                                            <svg className="invert" xmlns="http://www.w3.org/2000/svg" width={20} height={21} viewBox="0 0 20 21" fill="none">
                                                                <path d="M3.92512 7.77453C5.22103 11.9687 8.53091 15.2786 12.7251 16.5745C14.8357 17.2266 16.6663 15.3757 16.6663 13.1666C16.6663 12.6143 16.2171 12.1729 15.6687 12.1075C14.9545 12.0223 14.268 11.8467 13.621 11.5926L12.355 12.8587C10.2958 11.8732 8.62635 10.2038 7.64091 8.14464L8.90698 6.87857C8.65286 6.23159 8.47732 5.54513 8.39211 4.83093C8.32669 4.28253 7.88529 3.83325 7.33301 3.83325C5.12387 3.83325 3.27296 5.66384 3.92512 7.77453Z" stroke="#101010" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </div>
                                                        <Link className="phone text-md-medium ms-2" href="tel:+601111020111">+60 111 102 0111</Link>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="icon">
                                                            <svg className="invert" xmlns="http://www.w3.org/2000/svg" width={16} height={13} viewBox="0 0 16 13" fill="none">
                                                                <path d="M14.5938 0.875H1.40625C0.629281 0.875 0 1.50819 0 2.28125V10.7188C0 11.4964 0.633906 12.125 1.40625 12.125H14.5938C15.3642 12.125 16 11.4991 16 10.7188V2.28125C16 1.50956 15.3732 0.875 14.5938 0.875ZM14.3968 1.8125C14.1095 2.09828 9.16509 7.01666 8.99438 7.18647C8.72875 7.45209 8.37563 7.59834 8 7.59834C7.62437 7.59834 7.27125 7.45206 7.00475 7.18559C6.88994 7.07137 2.00009 2.20731 1.60319 1.8125H14.3968ZM0.9375 10.5279V2.47266L4.98869 6.5025L0.9375 10.5279ZM1.60378 11.1875L5.65338 7.16366L6.34272 7.84937C6.78541 8.29206 7.37397 8.53584 8 8.53584C8.62603 8.53584 9.21459 8.29206 9.65641 7.85025L10.3466 7.16366L14.3962 11.1875H1.60378ZM15.0625 10.5279L11.0113 6.5025L15.0625 2.47266V10.5279Z" fill="#101010" />
                                                            </svg>
                                                        </div>
                                                        <Link className="email text-md-medium ms-2" href="mailto:legendarycarrental.com">info@legendarycarrental.com</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-sm-6">
                                        <div className="card-contact">
                                            <div className="card-image">
                                                <div className="card-icon">
                                                    <svg className="invert" xmlns="http://www.w3.org/2000/svg" width={36} height={36} viewBox="0 0 36 36" fill="none">
                                                        <g clipPath="url(#clip0_389_17585)">
                                                            <path d="M35.9459 20.8441L35.3636 19.4651L35.7476 18.6345C35.9981 18.0905 35.7985 17.4156 35.2935 17.0945C34.0939 16.3343 32.8757 15.6313 31.5238 15.1755C29.6603 14.5472 27.6716 14.3426 25.7133 14.3426C24.7999 14.3426 24.0737 13.8273 23.1543 13.1751C21.8711 12.2646 20.2742 11.1316 17.5767 11.1316H13.2229C11.8167 11.1316 10.3154 11.325 8.76061 11.7065C8.76026 11.7066 8.75998 11.7066 8.75963 11.7066C5.3741 12.5371 2.51053 14.0573 1.10451 14.8899C0.423226 15.2939 0 16.037 0 16.8291V19.949C0 20.7406 0.590364 21.4253 1.37332 21.5417C1.37332 21.5417 2.51875 21.7097 2.63639 21.724C2.75459 22.5079 3.11987 23.2301 3.69365 23.7976C4.39222 24.4887 5.31651 24.8685 6.29825 24.8685H6.31892C8.13045 24.8587 9.63435 23.543 9.94401 21.8207H13.2551C13.6434 21.8207 13.9582 21.5059 13.9582 21.1176C13.9582 20.7292 13.6434 20.4144 13.2551 20.4144H9.92791C9.58048 18.7146 8.03081 17.4584 6.29881 17.4584C4.60226 17.4584 3.07797 18.659 2.69102 20.314C2.6238 20.3051 1.58005 20.1507 1.58005 20.1507C1.48097 20.136 1.4063 20.0492 1.4063 19.9489V16.8291C1.4063 16.531 1.56556 16.2514 1.82151 16.0996C3.10757 15.338 5.67294 13.9725 8.71835 13.1681L10.4629 14.8711C11.0368 15.4314 11.8182 15.7497 12.6201 15.7497H25.8265C29.7553 15.7745 31.8093 16.6434 33.4967 17.6369H32.5358C32.1475 17.6369 31.8326 17.9517 31.8326 18.34C31.8326 18.7284 32.1475 19.0432 32.5358 19.0432H34.015C33.9102 19.3299 33.9158 19.6491 34.0358 19.9356L34.238 20.4144H29.6707C29.3208 18.7167 27.7717 17.4584 26.0426 17.4584C24.3115 17.4584 22.7617 18.7122 22.414 20.4144H19.4393C19.0511 20.4144 18.7362 20.7292 18.7362 21.1176C18.7362 21.5059 19.0511 21.8207 19.4393 21.8207H22.3976C22.7091 23.5523 24.226 24.8677 26.0422 24.8677C27.8101 24.8677 29.3776 23.5648 29.6883 21.8207H35.2981C35.7927 21.8207 36.1383 21.2998 35.9459 20.8441ZM6.31133 23.4622C6.30704 23.4622 6.30289 23.4622 6.29867 23.4622C5.03729 23.4622 4.0076 22.4395 4.00071 21.1765C3.99396 19.9321 5.03961 18.8726 6.28644 18.8659C7.53312 18.856 8.59045 19.9061 8.59706 21.1516C8.60395 22.4188 7.57855 23.4554 6.31133 23.4622ZM27.6764 22.7795C27.2474 23.2132 26.6523 23.4615 26.0423 23.4615C24.781 23.4614 23.7512 22.4387 23.7443 21.1757C23.7374 19.924 24.792 18.865 26.0427 18.865C27.2845 18.865 28.3341 19.9133 28.3407 21.1508C28.3441 21.7647 28.1081 22.3431 27.6764 22.7795ZM22.3405 14.3219C22.3506 14.3291 22.3607 14.3363 22.3707 14.3434H14.8002V12.5378H17.5767C19.8259 12.5378 21.1043 13.4448 22.3405 14.3219ZM13.2229 12.5378H13.3939V14.3433H12.6205C12.1833 14.3433 11.7583 14.1702 11.4455 13.8649L10.3587 12.8041C11.3517 12.6271 12.311 12.5378 13.2229 12.5378Z" fill="black" />
                                                            <path d="M13.8516 17.0378H12.4453C12.057 17.0378 11.7422 17.3526 11.7422 17.741C11.7422 18.1293 12.057 18.4441 12.4453 18.4441H13.8516C14.24 18.4441 14.5548 18.1293 14.5548 17.741C14.5548 17.3527 14.24 17.0378 13.8516 17.0378Z" fill="black" />
                                                            <path d="M17.0257 20.8486C16.8803 20.4941 16.4606 20.3219 16.1074 20.4682C15.7535 20.6147 15.5805 21.0325 15.727 21.3865C15.8736 21.7404 16.2917 21.9129 16.6453 21.7669C16.9987 21.6209 17.1728 21.2018 17.0257 20.8486Z" fill="black" />
                                                        </g>
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="card-info">
                                                <div className="card-title mb-">
                                                    <Link className="title heading-6" href="#">Dubai</Link>
                                                </div>
                                                <div className="card-method-contact">
                                                    <div className="d-flex align-items-start mb-2">
                                                        <div className="icon">
                                                            <svg className="invert" xmlns="http://www.w3.org/2000/svg" width={18} height={19} viewBox="0 0 18 19" fill="none">
                                                                <path d="M9 1.0625C7.35897 1.0625 5.78516 1.7144 4.62478 2.87478C3.4644 4.03516 2.8125 5.60897 2.8125 7.25C2.8125 10.5181 8.325 17.4312 8.56125 17.7294C8.61396 17.7951 8.68074 17.8481 8.75668 17.8845C8.83262 17.921 8.91577 17.9399 9 17.9399C9.08423 17.9399 9.16738 17.921 9.24332 17.8845C9.31925 17.8481 9.38604 17.7951 9.43875 17.7294C9.675 17.4312 15.1875 10.5181 15.1875 7.25C15.1875 5.60897 14.5356 4.03516 13.3752 2.87478C12.2148 1.7144 10.641 1.0625 9 1.0625ZM9 16.4637C7.26188 14.2137 3.9375 9.4325 3.9375 7.25C3.9375 5.90734 4.47087 4.61967 5.42027 3.67027C6.36967 2.72087 7.65734 2.1875 9 2.1875C10.3427 2.1875 11.6303 2.72087 12.5797 3.67027C13.5291 4.61967 14.0625 5.90734 14.0625 7.25C14.0625 9.4325 10.7381 14.2025 9 16.4637Z" fill="#101010" />
                                                                <path d="M9 3.3125C8.33249 3.3125 7.67997 3.51044 7.12495 3.88129C6.56994 4.25214 6.13735 4.77924 5.88191 5.39594C5.62646 6.01264 5.55963 6.69124 5.68985 7.34593C5.82008 8.00062 6.14151 8.60198 6.61352 9.07399C7.08552 9.54599 7.68689 9.86743 8.34157 9.99765C8.99626 10.1279 9.67486 10.061 10.2916 9.80559C10.9083 9.55015 11.4354 9.11757 11.8062 8.56255C12.1771 8.00753 12.375 7.35501 12.375 6.6875C12.375 5.79239 12.0194 4.93395 11.3865 4.30101C10.7536 3.66808 9.89511 3.3125 9 3.3125ZM9 8.9375C8.55499 8.9375 8.11998 8.80554 7.74997 8.55831C7.37996 8.31107 7.09157 7.95967 6.92127 7.54854C6.75098 7.1374 6.70642 6.685 6.79323 6.24855C6.88005 5.81209 7.09434 5.41118 7.40901 5.09651C7.72368 4.78184 8.12459 4.56755 8.56105 4.48073C8.99751 4.39392 9.4499 4.43847 9.86104 4.60877C10.2722 4.77907 10.6236 5.06746 10.8708 5.43747C11.118 5.80748 11.25 6.24249 11.25 6.6875C11.25 7.28424 11.0129 7.85653 10.591 8.27849C10.169 8.70045 9.59674 8.9375 9 8.9375Z" fill="#101010" />
                                                            </svg>
                                                        </div>
                                                        <p className="location text-md-medium ms-2">Plot 25 street 4 - Al Quoz - Al Quoz Industrial Area 4 - Dubai</p>
                                                    </div>
                                                    <div className="d-flex align-items-start mb-2">
                                                        <div className="icon">
                                                            <svg className="invert" xmlns="http://www.w3.org/2000/svg" width={20} height={21} viewBox="0 0 20 21" fill="none">
                                                                <path d="M3.92512 7.77453C5.22103 11.9687 8.53091 15.2786 12.7251 16.5745C14.8357 17.2266 16.6663 15.3757 16.6663 13.1666C16.6663 12.6143 16.2171 12.1729 15.6687 12.1075C14.9545 12.0223 14.268 11.8467 13.621 11.5926L12.355 12.8587C10.2958 11.8732 8.62635 10.2038 7.64091 8.14464L8.90698 6.87857C8.65286 6.23159 8.47732 5.54513 8.39211 4.83093C8.32669 4.28253 7.88529 3.83325 7.33301 3.83325C5.12387 3.83325 3.27296 5.66384 3.92512 7.77453Z" stroke="#101010" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </div>
                                                        <Link className="phone text-md-medium ms-2" href="tel:+971545514155">+971545514155</Link>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="icon">
                                                            <svg className="invert" xmlns="http://www.w3.org/2000/svg" width={16} height={13} viewBox="0 0 16 13" fill="none">
                                                                <path d="M14.5938 0.875H1.40625C0.629281 0.875 0 1.50819 0 2.28125V10.7188C0 11.4964 0.633906 12.125 1.40625 12.125H14.5938C15.3642 12.125 16 11.4991 16 10.7188V2.28125C16 1.50956 15.3732 0.875 14.5938 0.875ZM14.3968 1.8125C14.1095 2.09828 9.16509 7.01666 8.99438 7.18647C8.72875 7.45209 8.37563 7.59834 8 7.59834C7.62437 7.59834 7.27125 7.45206 7.00475 7.18559C6.88994 7.07137 2.00009 2.20731 1.60319 1.8125H14.3968ZM0.9375 10.5279V2.47266L4.98869 6.5025L0.9375 10.5279ZM1.60378 11.1875L5.65338 7.16366L6.34272 7.84937C6.78541 8.29206 7.37397 8.53584 8 8.53584C8.62603 8.53584 9.21459 8.29206 9.65641 7.85025L10.3466 7.16366L14.3962 11.1875H1.60378ZM15.0625 10.5279L11.0113 6.5025L15.0625 2.47266V10.5279Z" fill="#101010" />
                                                            </svg>
                                                        </div>
                                                        <Link className="email text-md-medium ms-2" href="mailto:bestcarrentaldubai.ae">info@bestcarrentaldubai.ae</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </section>
                        <section className="box-section box-contact-form background-body">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-6 mb-30">
                                        <h2 className="neutral-1000 mb-25">Get in Touch</h2>
                                        {/* <div className="form-contact">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="text-sm-medium neutral-1000">First Name</label>
                                                        <input className="form-control username" type="text" placeholder="First Name" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="text-sm-medium neutral-1000">First Name</label>
                                                        <input className="form-control username" type="text" placeholder="Last Name" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <label className="text-sm-medium neutral-1000">Email Adress</label>
                                                        <input className="form-control email" type="email" placeholder="email@domain.com" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <label className="text-sm-medium neutral-1000">Phone Number</label>
                                                        <input className="form-control phone" type="text" placeholder="Phone number" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <label className="text-sm-medium neutral-1000">Your Message</label>
                                                        <textarea className="form-control" rows={6} placeholder="Leave us a message..." />
                                                    </div>
                                                </div>
                                                <div className="box-remember-forgot">
                                                    <div className="form-group">
                                                        <div className="remeber-me">
                                                            <label className="text-sm-medium neutral-500"> <input className="cb-remember" type="checkbox" />Agree to our <Link className="text-sm-medium neutral-1000" href="https://bestcarrentaldubai.ae/term-of-use">Terms of service </Link>and <Link className="text-sm-medium neutral-1000" href="https://bestcarrentaldubai.ae/privacy-policy">Privacy Policy</Link> </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <button className="btn btn-book">
                                                        Send message
                                                        <svg width={17} height={16} viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M8.5 15L15.5 8L8.5 1M15.5 8L1.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div> */}
                                        <form className="form-contact" onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>First Name</label>
                                                <input className="form-control" type="text" name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" required />
                                            </div>
                                            </div>
                                            <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Last Name</label>
                                                <input className="form-control" type="text" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" required />
                                            </div>
                                            </div>
                                            <div className="col-lg-12">
                                            <div className="form-group">
                                                <label>Email Address</label>
                                                <input className="form-control" type="email" name="email" value={form.email} onChange={handleChange} placeholder="email@domain.com" required />
                                            </div>
                                            </div>
                                            <div className="col-lg-12">
                                            <div className="form-group">
                                                <label>Phone Number</label>
                                                <input className="form-control" type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone number" required />
                                            </div>
                                            </div>
                                            <div className="col-lg-12">
                                            <div className="form-group">
                                                <label>Your Message</label>
                                                <textarea className="form-control" name="message" rows={6} value={form.message} onChange={handleChange} placeholder="Leave us a message..." required />
                                            </div>
                                            </div>
                                            {/* <div className="box-remember-forgot">
                                            <div className="form-group">
                                                <div className="remeber-me">
                                                    <label className="text-sm-medium neutral-500"> <input className="cb-remember" type="checkbox" />Agree to our <Link className="text-sm-medium neutral-1000" href="https://bestcarrentaldubai.ae/term-of-use">Terms of service </Link>and <Link className="text-sm-medium neutral-1000" href="https://bestcarrentaldubai.ae/privacy-policy">Privacy Policy</Link> </label>
                                                </div>
                                                </div>
                                            </div> */}
                                            <div className="box-remember-forgot">
  <div className="form-group">
    <div className="remeber-me">
      <label className="text-sm-medium neutral-500">
        <input
          className="cb-remember"
          type="checkbox"
          name="agree"
          checked={form.agree}
          onChange={handleChange}
          required
        />{" "}
        Agree to our{" "}
        <Link
          className="text-sm-medium neutral-1000"
          href="https://bestcarrentaldubai.ae/term-of-use"
          target="_blank"
        >
          Terms of service
        </Link>{" "}
        and{" "}
        <Link
          className="text-sm-medium neutral-1000"
          href="https://bestcarrentaldubai.ae/privacy-policy"
          target="_blank"
        >
          Privacy Policy
        </Link>
      </label>
    </div>
  </div>
</div>

                                            <div className="col-lg-12">
                                            <button className="btn btn-book" type="submit">
                                                Send message
                                                <svg width={17} height={16} viewBox="0 0 17 16">
                                                <path d="M8.5 15L15.5 8L8.5 1M15.5 8L1.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>
                                            </div>
                                        </div>
                                        </form>
                                       {message && <p className="mt-3 text-sm-medium">{message}</p>}
                                    </div>
                                    <div className="col-lg-6 mb-30">
                                        <div className="ps-lg-5">
                                            <h4 className="neutral-1000">Our location</h4>
                                            <p className="neutral-500 mb-30">Plot 25 street 4 - Al Quoz - Al Quoz Industrial Area 4 - Dubai</p>
                                            <iframe className="h-520 rounded-3" 
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.4561953052757!2d55.23101247538176!3d25.127649377728423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69c4ff75f81b%3A0x4f6af5175b53800d!2s467F%2BQ4%20-%20plot%2025%20street%204%20-%20Al%20Quoz%20-%20Al%20Quoz%20Industrial%20Area%204%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2s!4v1716927259821!5m2!1sen!2s"
    
                                            width="100%" height={650} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade">
                                            </iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
      
    )
}   
