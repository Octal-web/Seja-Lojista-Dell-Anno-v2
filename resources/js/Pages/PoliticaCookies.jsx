import React from 'react';
import { usePage } from '@inertiajs/react'

import DefaultLayout from '@/Layouts/DefaultLayout';
import { PolicyContent } from '@/Components/Sections/PolicyContent';

const Page = () => {
    const { texto } = usePage().props;

    return (
        <DefaultLayout>
            <PolicyContent content={{titulo: 'Política de Cookies', texto: texto}} />
        </DefaultLayout>
    );
};

export default Page;