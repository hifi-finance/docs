import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";

const OuterWrapper = styled.div`
  box-sizing: border-box;
`;

const InnerWrapper = styled.div`
  border: 1px solid rgba(0, 0, 0, 12%);
  border-radius: 4px;
  box-shadow: 0px 1px 2px rgb(0 0 0 / 12%);
  color: var(--ifm-link-color);
  display: flex;
  flex-flow: row nowrap;
  margin: 1.5rem auto;
  padding: 1rem 1.25rem;
  width: 100%;

  &:active,
  &:hover {
    color: var(--ifm-primary-color);
  }
`;

const LabelWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const Title = styled.a`
  font-weight: 600;
  text-transform: none;
`;

const Subtitle = styled.a`
  text-transform: none;
`;

interface LinkPreviewProps {
  url: string;
}

export default function LinkPreview(props: LinkPreviewProps): JSX.Element {
  const [title, setTitle] = useState<string>("...");
  const [subtitle, setSubtitle] = useState<string>("...");

  useEffect(() => {}, [subtitle, title]);

  return (
    <OuterWrapper>
      <InnerWrapper>
        <LabelWrapper>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </LabelWrapper>
      </InnerWrapper>
    </OuterWrapper>
  );
}
