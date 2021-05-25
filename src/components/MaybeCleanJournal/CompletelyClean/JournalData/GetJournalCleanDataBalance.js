import React from "react";
import { useParams } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useQuery
} from "@apollo/client";
import AddToJournalCleanData from "./AddToJournalCleanData";

export default function GetJournalCleanDataBalance() {
  const { deleteId, currentCount } = useParams();

  const { loading, error, data, refetch } = useQuery(GETJOURNALCLEANBALANCE);

  if (loading) return null;
  if (error) return `Error! ${error}`;

  const balanceOfCleanedData = parseInt(
    Object.values(data)[0]
      .map((x) => x.balance)
      .join("")
  );

  const totalOfCleanedData = parseInt(
    Object.values(data)[0]
      .map((x) => x.total)
      .join("")
  );

  return (
    <div>
      <AddToJournalCleanData
        balance={balanceOfCleanedData}
        count={currentCount}
        total={totalOfCleanedData}
      />
    </div>
  );
}

const GETJOURNALCLEANBALANCE = gql`
  query MyQuery {
    JournalCleanData(limit: 1, order_by: { id: desc }) {
      balance
      total
    }
  }
`;
