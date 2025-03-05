const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className={"border-t"}>
            <div className={"p-5 flex-center text-sm font-semibold text-black/50 dark:text-white"}>
                &copy;{currentYear} SuperStore. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
