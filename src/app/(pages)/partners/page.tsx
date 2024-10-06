import Carousel from '@/components/Carousel';
import React from "react";

interface PartnersSectionProps {
    title: string;
    images: string[];
}

const PartnersSection: React.FC<PartnersSectionProps> = ({ title, images }) => {
    return (
        <section className="mt-20 p-4 rounded-xl mx-auto w-full bg-white shadow-xl">
            <h2 className="font-bold text-xl lg:text-3xl my-10 text-center">
                {title}
            </h2>
            <div className="h-auto w-full flex items-center">
                <Carousel images={images} />
            </div>
        </section>
    );
};

export default function Partners() {
    const imagesOrganizations = [
        "/logo-empujar.png",
        "/logo-fundacion-integrar.png",
        "/logo-forge.png",
        "/logo-silvertech.png",
        "/logo-gestion-y-desarrollo.png",
        "/logo-codo-a-codo.png",
    ];

    const imagesCompanies = [
        "/logo-d3.png",
        "/logo-globant.png",
        "/logo-hansen.png",
        "/logo-epidata.png",
        "/logo-prisma.png",
        "/logo-gire.png",
        "/logo-softtek.png",
        "/logo-pigmalion.png",
        "/logo-mindhub.png",
    ];

    return (
        <main className="container max-w-3xl mt-10">
            <PartnersSection title="Organizaciones Participantes" images={imagesOrganizations} />
            <PartnersSection title="Empresas Participantes" images={imagesCompanies} />
        </main>
    );
}
