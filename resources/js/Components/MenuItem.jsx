import { useEffect, useRef, useState } from "react";
import { CustomLink } from "./CustomLink";

export const MenuItem = ({ item, index, isMenuOpen }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const toggleRef = useRef(null);

    const toggleSubmenu = () => {
        setIsOpen((prev) => !prev);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                toggleRef.current &&
                !toggleRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <li
            className="max-md:opacity-0 max-md:translate-y-[-20px]"
            style={
                window.innerWidth < 768
                    ? {
                          opacity: isMenuOpen ? 1 : 0,
                          transform: isMenuOpen
                              ? "translateY(0)"
                              : "translateY(-20px)",
                          transition: `opacity 0.4s ease-out ${index * 0.1}s, transform 0.4s ease-out ${index * 0.1}s`,
                      }
                    : {}
            }
        >
            {item.external ? (
                <a
                    href={item.route}
                    className="relative block text-primary tracking-tighter transition-all text-opacity-0 xl:p-2 after:content-[attr(data-after)] after:leading-none hover:after:text-opacity-100 after:text-xl after:lg:text-sm after:xl:text-base after:2xl:text-base hover:after:font-bold after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:text-primary after:whitespace-nowrap after:transition-all duration-300 after:duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-after={item.name}
                >
                    {item.name}
                </a>
            ) : Array.isArray(item.submenu) && item.submenu.length > 0 ? (
                <button
                    ref={toggleRef}
                    type="button"
                    onClick={toggleSubmenu}
                    className="relative block text-primary tracking-tighter transition-all text-opacity-0 xl:p-2 after:content-[attr(data-after)] after:leading-none hover:after:text-opacity-100 after:text-xl after:lg:text-sm after:xl:text-base after:2xl:text-base hover:after:font-bold after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:text-primary after:whitespace-nowrap after:transition-all duration-300 after:duration-300"
                    data-after={item.name}
                >
                    {item.name}
                    <span aria-hidden="true" className="ml-2 text-base">{isOpen ? "▲" : "▼"}</span>
                </button>
            ) : typeof item.submenu === "string" &&
              item.submenu === "Produtos" ? (
                <button
                    ref={toggleRef}
                    type="button"
                    onClick={toggleSubmenu}
                    className="relative block text-primary tracking-tighter transition-all text-opacity-0 xl:p-2 after:content-[attr(data-after)] after:leading-none hover:after:text-opacity-100 after:text-xl after:lg:text-sm after:xl:text-base after:2xl:text-base hover:after:font-bold after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:text-primary after:whitespace-nowrap after:transition-all duration-300 after:duration-300"
                    data-after={item.name}
                >
                    {item.name}
                </button>
            ) : (
                <CustomLink
                    href={route(item.route)}
                    to={item.to}
                    className="relative block font-secondary font-light text-white md:text-black text-[14px] 2xl:text-[16px] transition-all  md:p-2 !text-opacity-0 after:content-[attr(data-after)]  after:leading-none hover:after:text-opacity-100 after:text-[14px] 2xl:after:text-[16px] hover:after:font-bold after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:text-white xl:after:text-black after:whitespace-nowrap after:transition-all duration-300 after:duration-300"
                    data-after={item.name}
                >
                    {item.name}
                </CustomLink>
            )}
        </li>
    );
};
