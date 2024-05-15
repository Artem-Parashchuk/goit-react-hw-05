import { NavLink, Outlet } from "react-router-dom";
import s from "./Navigation.module.css";
import clsx from "clsx";
import { Suspense } from "react";

const Navigation = () => {
  const addActiveLink = ({ isActive }) => {
    return clsx(s.nav, isActive && s.active);
  };
  return (
    <div className={s.wrapper}>
      <header className={s.header}>
        <nav className={s.nav}>
          <ul className={s.list}>
            <li className={s.item}>
              <NavLink
                className={addActiveLink}
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className={s.item}>
              <NavLink
                to="/movies"
                className={addActiveLink}
              >
                Movies
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <Suspense
        fallback={<span className="loading loading-spinner text-error"></span>}
      >
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Navigation;
