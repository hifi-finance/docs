import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import clsx from "clsx";
import React from "react";

import styles from "./HomepageHeader.module.css";

export default function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">The Hifi Lending Protocol allows anyone to borrow against their crypto. Hifi uses a bond-like instrument, representing an on-chain obligation that settles on a specific future date. Buying and selling the tokenized debt enables fixed-rate lending and borrowing — something much needed in decentralized finance today.</p>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/protocol/introduction">
            Learn More
          </Link>
        </div>
      </div>
    </header>
  );
}
