import LinkFooter from "./LinkFooter";

function Footer() {
  const linksFooter = [
    {
      nombre: "Nicolas Espindola",
      link: "https://www.linkedin.com/in/javier-espindola/",
    },
    {
      nombre: "Gabriel García",
      link: "https://www.linkedin.com/in/gabriel-garcia-developer/",
    },
    {
      nombre: "Elizabeth Rabinad",
      link: "https://www.linkedin.com/in/elizabeth-rabinad-4b6131167/",
    },
    {
      nombre: "Sandro Borga",
      link: "https://www.linkedin.com/in/sandro-borga-065936246/",
    },
  ];

  return (
    <footer className="w-full justify-between text-center px-3 py-1 max-lg:pl-12 mt-auto">
      <div className="p-2 flex justify-between max-lg:flex-col max-lg:p-0 ">
        <div className="container  text-center mx-auto flex justify-end gap-10 max-lg:flex-wrap max-lg:items-center max-lg:justify-center max-sm:gap-2 max-sm:py-3">
          {linksFooter.map((e, i) => {
            return <LinkFooter key={`${e.nombre}${i}`} dataFooter={e} />;
          })}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
