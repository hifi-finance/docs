import React from "react";

interface EtherscanProps {
  size: number;
}

export default function EthereumIcon(props: EtherscanProps): JSX.Element {
  return (
    <svg width={props.size} height={props.size} viewBox="0 0 1920 1920" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon fill="#8A92B2" points="959.8,80.7 420.1,976.3 959.8,731  " />
      <polygon fill="#62688F" points="959.8,731 420.1,976.3 959.8,1295.4  " />
      <polygon fill="#62688F" points="1499.6,976.3 959.8,80.7 959.8,731  " />
      <polygon fill="#454A75" points="959.8,1295.4 1499.6,976.3 959.8,731  " />
      <polygon fill="#8A92B2" points="420.1,1078.7 959.8,1839.3 959.8,1397.6  " />
      <polygon fill="#62688F" points="959.8,1397.6 959.8,1839.3 1499.9,1078.7  " />
    </svg>
  );
}
