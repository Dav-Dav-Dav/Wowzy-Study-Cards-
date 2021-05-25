import React from "react";
import { useQuery, gql } from "@apollo/client";
import AddReward from "./AddReward";

//This function gets my goHenry balance
export default function GetMyBalance() {
  const { loading, error, data } = useQuery(gql`
    {
      GoHenry(limit: 1, order_by: { id: desc }) {
        Balance
      }
    }
  `);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  let latestBalance = parseFloat(
    Object.values(data)[0]
      .map((x) => x.Balance)
      .join("")
  );

  console.log(latestBalance);

  return (
    <div>
      <AddReward balance={latestBalance} />
    </div>
  );
}
