
import Image from 'next/image';

const ResponsiveImage = () => {
  return (
    <div className="relative w-full h-6 lg:h-12">
      {/* Imagen para dispositivos móviles */}
      <Image
        src="/polo-logo-mobile.png" 
        alt="Logo de Polo It mobile"
        objectFit="cover"
        className="block lg:hidden"
        width={90} 
        height={60}
      />
      {/* Imagen para dispositivos de escritorio */}
      <Image
        src="/logo-polo-it.png" 
        alt="Logo de Polo It"       
        objectFit="cover"
        className="hidden lg:block" 
        width={150} 
        height={50}
      />
    </div>
  );
};

export default ResponsiveImage;
