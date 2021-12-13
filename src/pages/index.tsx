import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styled from "@emotion/styled";
import { ChatIcon } from "@heroicons/react/outline";
import Layout from "@theme/Layout";
import React from "react";

import GitHubIcon from "../components/GitHubIcon";
import HomepageHeader from "../components/HomepageHeader";

const OuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0rem;
  width: 100%;
`;

const BodyWrapper = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 16px;
  justify-content: center;
  margin: 0rem auto;
  max-width: 960px;
  padding: 1rem 0;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    padding: 2rem 1rem;
    max-width: 100%;
    margin: 0rem 1rem;
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FlexGrowDiv = styled.div`
  flex-grow: 1;
`;

const Card = styled.div`
  display: flex;
  max-height: 250px;
  min-width: 350px;
  padding: 1rem;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 20px;
  border: 1px solid var(--ifm-color-emphasis-200);

  &:hover {
    border: 1px solid var(--ifm-color-emphasis-400);
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.05);
  }

  @media (max-width: 960px) {
    width: 100%;
  }
`;

const CenterCard = styled(Card)`
  align-items: center;
  display: grid;
  flex-direction: row;
  grid-template-columns: 48px 1fr;
  justify-content: space-between;
  gap: 24px;
  min-width: 250px;

  h3 {
    margin-bottom: 0.25rem;
  }

  p {
    margin-bottom: 0px;
  }
`;

const StyledGithubIcon = styled.div`
  svg {
    fill: var(--ifm-font-color-base);
  }
`;

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout description="Technical Documentation for the Hifi Protocol" title={siteConfig.title}>
      <OuterWrapper>
        <HomepageHeader />
        <FlexGrowDiv />
        <BodyWrapper>
          <Link style={{ textDecoration: "none" }} href={"https://discord.com/invite/mhtSRz6"}>
            <CenterCard>
              <img src="img/social/discord.svg" style={{ width: "48px", height: "48px" }} />
              <div>
                <h3>Discord</h3>
                <p>Hop in to the #development channel to get help.</p>
              </div>
            </CenterCard>
          </Link>
          <Link style={{ textDecoration: "none" }} href={"https://gov.hifi.finance/"}>
            <CenterCard>
              <ChatIcon style={{ width: "48px", height: "48px" }} />
              <div>
                <h3>Forum</h3>
                <p>Discuss governance and more.</p>
              </div>
            </CenterCard>
          </Link>

          <Link style={{ textDecoration: "none" }} href={"https://github.com/hifi-finance"}>
            <CenterCard>
              <StyledGithubIcon>
                <GitHubIcon />{" "}
              </StyledGithubIcon>
              <div>
                <h3>GitHub</h3>
                <p>View all Hifi code repositories.</p>
              </div>
            </CenterCard>
          </Link>
        </BodyWrapper>
        {/* <FlexGrowDiv /> */}
      </OuterWrapper>
    </Layout>
  );
}
