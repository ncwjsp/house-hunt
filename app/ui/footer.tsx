import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer footer-center p-10">
      <aside>
        <svg
          width="50"
          height="50"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
          className="inline-block fill-current"
        ></svg>
        <p className="font-bold">
          Nueachai Wijitsopon
          <br />
        </p>
        <p>No Copyright © {new Date().getFullYear()} - No right reserved</p>
      </aside>
      <nav>
        <div>
          <a href="https://github.com/ncwjsp/house-hunt">
            <FaGithub size={36} />
          </a>
        </div>
      </nav>
    </footer>
  );
}
