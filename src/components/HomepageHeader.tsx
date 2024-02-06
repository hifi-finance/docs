import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import clsx from "clsx";
import React from "react";

import styles from "./HomepageHeader.module.css";

const ProtocolDocsButton = () => {
  return (
    <Link className="button button--primary button--lg" to="/protocol/introduction">
      <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: "translate(-0.25rem, 0.25rem)" }}
      >
        <path
          d="M7.03125 8.33203L10.0312 10.582L7.03125 12.832M11.5312 12.832H14.5312M5.53125 21.082H19.0312C19.628 21.082 20.2003 20.845 20.6222 20.423C21.0442 20.0011 21.2812 19.4288 21.2812 18.832V6.83203C21.2812 6.23529 21.0442 5.663 20.6222 5.24104C20.2003 4.81908 19.628 4.58203 19.0312 4.58203H5.53125C4.93451 4.58203 4.36222 4.81908 3.94026 5.24104C3.5183 5.663 3.28125 6.23529 3.28125 6.83203V18.832C3.28125 19.4288 3.5183 20.0011 3.94026 20.423C4.36222 20.845 4.93451 21.082 5.53125 21.082Z"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      Protocol Docs
    </Link>
  );
};

const WebsiteButton = () => {
  return (
    <Link className="button button--secondary button--lg" to="https://hifi.finance">
      <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: "translate(-0.25rem, 0.3125rem)", scale: "0.75" }}
      >
        <path
          d="M11.8786 20.1643L19.6135 12.4294C20.1268 11.9173 20.8224 11.6296 21.5475 11.6296C22.2726 11.6296 22.9681 11.9173 23.4815 12.4294C23.9936 12.9427 24.2812 13.6383 24.2812 14.3634C24.2812 15.0885 23.9936 15.784 23.4815 16.2974L15.7466 24.0323C15.2333 24.5444 14.5377 24.832 13.8126 24.832C13.0875 24.832 12.392 24.5444 11.8786 24.0323C11.3665 23.5189 11.0789 22.8234 11.0789 22.0983C11.0789 21.3731 11.3665 20.6776 11.8786 20.1643ZM1.08103 13.2346C1.59432 13.7465 2.28962 14.0339 3.0145 14.0339C3.73938 14.0339 4.43468 13.7465 4.94797 13.2346L12.6839 5.49875C13.1957 4.98546 13.4831 4.29016 13.4831 3.56528C13.4831 2.8404 13.1957 2.1451 12.6839 1.63181C12.1705 1.11966 11.475 0.832031 10.7499 0.832031C10.0248 0.832031 9.32924 1.11966 8.81592 1.63181L1.08103 9.3667C0.568877 9.88003 0.28125 10.5755 0.28125 11.3007C0.28125 12.0258 0.568877 12.7213 1.08103 13.2346ZM9.37877 15.7315C9.8921 16.2436 10.5876 16.5313 11.3127 16.5313C12.0379 16.5313 12.7334 16.2436 13.2467 15.7315L15.1807 13.7975C15.6928 13.2842 15.9805 12.5887 15.9805 11.8635C15.9805 11.1384 15.6928 10.4429 15.1807 9.92955C14.6674 9.41739 13.9718 9.12977 13.2467 9.12977C12.5216 9.12977 11.8261 9.41739 11.3127 9.92955L9.37877 11.8635C8.86661 12.3769 8.57899 13.0724 8.57899 13.7975C8.57899 14.5226 8.86661 15.2181 9.37877 15.7315Z"
          fill="#101010"
        />
      </svg>
      Website
    </Link>
  );
};

export default function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className={clsx("front--title", styles.frontTitle)}>{"Predictable Liquidity"}</h1>
        <p className={clsx("front--subtitle", styles.frontSubtitle)}>
          The Hifi Lending Protocol offers a reliable way to maximize the potential of your crypto and tokenized assets.
          With Hifi, you're not just borrowing or lending; you're empowering your investments through a pioneering
          system that blends the security of blockchain with the predictability of fixed-rate returns.
        </p>
        <div className={styles.buttons}>
          <ProtocolDocsButton />
          <span style={{ width: "1.25rem" }} />
          <WebsiteButton />
        </div>
      </div>
    </header>
  );
}
