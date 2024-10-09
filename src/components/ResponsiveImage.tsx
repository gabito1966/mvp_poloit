
import Image from 'next/image';


const ResponsiveImage = () => {
  return (
    <div className="flex">
      <Image
        src="/logo-polo-mobile.png" 
        alt="Logo de Polo It mobile"
        style={{ objectFit: 'cover' }}
        className="block lg:hidden"
        width={30} 
        height={30}
      />
      <Image
        src="/logo-polo-it.png" 
        alt="Logo de Polo It"       
        style={{ objectFit: 'cover' }}
        className="hidden lg:block" 
        width={150} 
        height={50}
      />
    </div>
  );
};

export default ResponsiveImage;
