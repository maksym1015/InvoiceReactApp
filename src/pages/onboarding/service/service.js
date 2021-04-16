import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

import { pageVariants } from "../../../utils/transitions";

export default function Service() {
  const { register, errors } = useForm();
  const history = useHistory();

  let [services, setServices] = useState([
    "Beauty & Personal Care",
    "Food & Beverage",
    "Fitness",
    "Home Services",
    "Digital Services",
    "Retail",
    "I’m not sure yet…",
  ]);

  const [active, setActive] = useState(false);

  useEffect(() => {
    if (active !== false) {
      // console.log(services[active]);
      setTimeout(() => {
        history.push("/templates");
      }, 500);
    }
  }, [active]);

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="px-3 pt-4 pb-7 custom-height bg-custom-light text-primary"
    >
      <div className="font-weight-bold mt-3 ml-3">
        <Link to="/">Honeydu</Link>
      </div>

      <form className="service-form p-5 mt-5">
        <p className="page-title text-primary text-center">What do you do?</p>
        <p className="font-weight-bold desktop-none">What do you do?</p>

        {services.map((service, index) => (
          <div
            className={
              active === index
                ? "form-group-custom active"
                : "form-group-custom"
            }
            onClick={() => setActive(index)}
            key={index}
          >
            <label className="form-check-label w-100 h-100">
              <input
                type="radio"
                name="service"
                value={index}
                ref={register({ required: "Please select an option." })}
              />
              {service}
            </label>
          </div>
        ))}

        {errors.service && (
          <span className="text-danger">{errors.service.message}</span>
        )}
      </form>
    </motion.div>
  );
}
