// components/ResponsiveImage.tsx

import Image from 'next/image';

const ResponsiveImage = () => {
  return (
    <div className="relative w-full h-6 md:h-20">
      {/* Imagen para dispositivos móviles */}
      <Image
        src="/polo-logo-mobile.png" 
        alt="logo de Polo It mobile"
        layout="fill"
        objectFit="cover"
        className="block md:hidden" 
      />
      {/* Imagen para dispositivos de escritorio */}
      <Image
        src="/logo-polo-it.png" 
        alt="Logo de Polo It"
        layout="fill"
        objectFit="cover"
        className="hidden md:block" 
      />
    </div>
  );
};

export default ResponsiveImage;
