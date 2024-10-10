import Carousel from '@/components/Carousel';
import { PartnersSectionProps } from '@/lib/definitions/frontEndDefinitions';
import React from "react";


const PartnersSection: React.FC<PartnersSectionProps> = ({ title, paragraph , images }) => {
    return (        
        <section className="container max-w-7xl pt-5 ">    
            <div className="w-full flex-grow p-1 ">
                <h1 className="font-bold text-xl lg:text-3xl my-2 mx-5 text-center lg:text-left">
                    {title}
                </h1>
                <h2 className="w-full font-semibold text-md lg:text-xl my-5 px-10 text-left">
                    {paragraph}
                </h2>
                <div className="h-auto w-full flex items-center mb-1">
                    <Carousel images={images} />
                </div>
                <hr />
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
        <main className="container max-w-7xl mt-10 mx-2 bg-white dark:bg-gray-700 rounded-xl shadow-xl">
            <PartnersSection title="Organizaciones Colaboradoras" paragraph="En esta sección encontrarás todas las organizaciones que forman parte de nuestro programa de aceleración. Estas organizaciones, tanto ONGs como empresas, trabajan junto a nuestros estudiantes y mentores para brindarles oportunidades de crecimiento y aprendizaje en el mundo real" images={[]} />
            <PartnersSection title="Organizaciones Participantes" paragraph="Contribuyen con recursos, conocimiento y apoyo para fortalecer la educación y el impacto social." images={imagesOrganizations} />
            <PartnersSection title="Empresas Participantes" paragraph="Ofrecen mentoría, herramientas y oportunidades de prácticas para nuestros estudiantes " images={imagesCompanies} />
        </main>
    );
}
