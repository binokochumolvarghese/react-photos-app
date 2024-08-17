const Footer = () => {

const d = new Date();
let year = d.getFullYear();

return(
  <footer >
    <div className="bg-slate-200 p-6 text-center mt-10 bottom-0">
      <span>Photos App © {year} </span>
      <br/>
      <a className="font-light" href="https://binovarghese.com/">
         Made with ✨ by Bino
      </a>
    </div>
  </footer>
)
};

export default Footer;
