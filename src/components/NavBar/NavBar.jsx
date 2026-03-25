import { useState } from "react";
import styles from "./styles/NavBar.module.css";
import { HoverTile } from "../courseDetails/HoverTile";
import { menuLinks } from "./styles/helper/menuLink";
import logo from '../../assets/careerzone.png'

function Navbar({ onCourseClick }) {
  const [open, setOpen] = useState(false);
  const [expandedDropdown, setExpandedDropdown] = useState(null);
  const [expandedSubGroup, setExpandedSubGroup] = useState(null);

  const toggleDropdown = (label) => {
    setExpandedDropdown(expandedDropdown === label ? null : label);
    setExpandedSubGroup(null);
  };

  const toggleSubGroup = (title) => {
    setExpandedSubGroup(expandedSubGroup === title ? null : title);
  };

  const closeSidebar = () => {
    setOpen(false);
    setExpandedDropdown(null);
    setExpandedSubGroup(null);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}><img src={logo} alt="" /></div>

      <div className={styles.hamburger} onClick={() => setOpen(!open)}>
        ☰
      </div>

      <div className={styles.links}>
        {menuLinks.map(({ label, boxes, offset }, index) => (
          <div key={label} className={styles.linkWrapper}>
            <a
              className={styles[`link${index}`]}
              onClick={(e) => {
                e.preventDefault();
                onCourseClick(label);
              }}
              href="#"
            >
              {label}
            </a>
            {boxes && (
              <div className={styles[`hoverBox${index}`]}>
                <HoverTile
                  label={label}
                  boxes={boxes}
                  style={{ left: `${offset}px` }}
                  onClick={onCourseClick}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {open && (
        <div className={styles.sidebar}>
          <div className={styles.closeBtn} onClick={closeSidebar}>✖</div>
          {menuLinks.map(({ label, boxes }) => (
            <div key={label} className={styles.sidebarItem}>
              <div
                className={styles.sidebarMainLink}
                onClick={() => (boxes ? toggleDropdown(label) : (onCourseClick(label), closeSidebar()))}
              >
                {label} {boxes && <span className={styles.caret}>▾</span>}
              </div>
              {boxes && expandedDropdown === label && (
                <div className={styles.dropdownBox}>
                  {boxes.map((group, index) => {
                    const [title, ...items] = group;
                    return (
                      <div key={index}>
                        <div
                          className={styles.dropdownTitle}
                          onClick={() => toggleSubGroup(title)}
                        >
                          {title} <span className={styles.caret}>▾</span>
                        </div>
                        {expandedSubGroup === title && (
                          <ul className={styles.dropdownList}>
                            {items.map((item, i) => (
                              <li
                                key={i}
                                onClick={() => {
                                  onCourseClick(`${label}/${item}`);
                                  closeSidebar();
                                }}
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
