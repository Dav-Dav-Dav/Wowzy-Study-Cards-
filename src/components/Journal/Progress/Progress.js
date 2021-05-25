import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

export default function Progress() {
  useEffect(() => {
    refetch();
  }, ["onetime"]);

  const { loading, error, data, refetch } = useQuery(
    GETREFRAMETEXTBYINCOMPLETE
  );

  if (loading) return null;
  if (error) return `Error! ${error}`;

  const leftLeft = Object.values(data)[0].length;

  return (
    <div class="grid grid-rows-2"> 
    <p class="text-3xl">L. Todo</p>
    <p class="text-5xl flex justify-center">{leftLeft}</p>
    </div>
  );
}

//Query by {"status": "incomplete"}, limit to 1
const GETREFRAMETEXTBYINCOMPLETE = gql`
  query MyQuery {
    rates(where: { status: { _eq: "incomplete" } }) {
      id
    }
  }
`;
