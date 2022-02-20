function Footer() {
  const footerYear = new Date().getFullYear();

  return (
    <footer className="footer h-10 bg-blue-900 text-primary-content  footer-center fixed bottom-0">
      <div>
        <p>Copyright &copy; {footerYear} All rights reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
