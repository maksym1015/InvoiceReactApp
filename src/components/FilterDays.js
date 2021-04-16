import React from "react";

export default function FilterDays(props) {
  const UL = (ul) => {
    const activeIndex = ul.findIndex((li) => li.active);

    if (activeIndex !== undefined) {
      ul.unshift({
        id: ul[activeIndex].id,
        text: ul[activeIndex].text,
        active: true,
      });
    }

    return (
      <ul className="d-flex justify-content-between d-xl-block">
        {ul.map((li, index) => {
          return (
            <li key={index}>
              <a
                className={index === 0 ? "active" : ""}
                id={li.id}
                onClick={index !== 0 ? undefined : props.onClick}
              >
                <span className="textSBold__font-size">{li.text}</span>
              </a>
            </li>
          );
        })}
      </ul>
    );
  };

  return <nav className="filter-days text-xxs">{UL(props.ul)}</nav>;
}
