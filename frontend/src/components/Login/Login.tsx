// LoginPage.tsx
import React from "react";
import LoginForm from "./LoginForm";
import "../../components/Home/Home.css";

import "../../App.css";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};
const formVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const LoginPage: React.FC = () => {
  return (
    <div className="home-container">
      <motion.div
        className="motion-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="App-heading">Login Page</h1>
        <LoginForm />
        <motion.p
          style={{ marginTop: "20px", textAlign: "center" }}
          variants={formVariants}
        >
          Don't have an account? <a href="/signup">Sign Up</a>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
