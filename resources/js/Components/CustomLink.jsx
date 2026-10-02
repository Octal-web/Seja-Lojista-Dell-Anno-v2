import React from 'react';
import { Link } from '@inertiajs/react';
import { router } from '@inertiajs/react'

export const CustomLink = ({ href, to, children, className, closeOnClick = false, ...props }) => {
    const handleClick = (e) => {
        e.preventDefault();

        const fullUrl = new URL(href, window.location.origin).href;
        const currentUrl = window.location.origin + window.location.pathname;
        
        if (fullUrl === currentUrl) {
            const hash = to;
            
            if (hash) {
                const element = document.querySelector(hash);
                
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }

                if (closeOnClick) {
                    closeOnClick(false);
                }
            }
        } else {
            router.visit(fullUrl, {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    const hash = to;
                    
                    if (hash) {
                        setTimeout(() => {
                            const element = document.querySelector(hash);
                            
                            if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                            }
                        }, 100);
                    }
                }
            });
        }
    };

    return (
        <Link className={className} onClick={handleClick} {...props}>
            {children}
        </Link>
    );
};