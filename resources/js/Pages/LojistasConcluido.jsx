import React, { useEffect } from 'react';
import { usePage } from '@inertiajs/react';

import DefaultLayout from '@/Layouts/DefaultLayout';
import { Concluded } from '@/Components/Sections/Concluded';

const Page = () => {
    const { etapa1 } = usePage().props;

    useEffect(() => {
        if (!etapa1?.token) return;

        // Evita contar a mesma conversão de novo em reload ou ao reabrir o link
        const storageKey = `lead_concluido_${etapa1.token}`;

        try {
            if (localStorage.getItem(storageKey)) return;
            localStorage.setItem(storageKey, '1');
        } catch (e) {}

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: 'lead_concluido',
            lead_nome: etapa1.nome,
            lead_email: etapa1.email,
            lead_telefone: etapa1.telefone,
            lead_cep: etapa1.cep,
        });
    }, [etapa1?.token]);

    return (
        <DefaultLayout>
            <Concluded />
        </DefaultLayout>
    );
};

export default Page;