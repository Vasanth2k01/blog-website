import React from "react";
import { motion } from "framer-motion";
import FormComp from "../Form";
import "./Home.css";
import "../../App.css";

const Home: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const formVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <div className="home-container">
      <motion.div
        className="motion-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={formVariants} className="title-colour">
          Welcome to Blogger!
        </motion.h1>
        <motion.h1 variants={formVariants} className="App-heading">
          Sign Up
        </motion.h1>

        <motion.div variants={formVariants}>
          <FormComp />
        </motion.div>

        <motion.p
          style={{ marginTop: "20px", textAlign: "center" }}
          variants={formVariants}
        >
          Already have an account? <a href="/login">Log In</a>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Home;
