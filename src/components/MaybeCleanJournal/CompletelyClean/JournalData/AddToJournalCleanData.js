import React, { useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import Delete from "../Delete/Delete";

export default function AddToJournalCleanData(props) {
  const newBalance = props.balance + parseInt(props.count);
  const newTotal = props.total + 1;
  const newAverage = parseInt(newBalance / newTotal);

  const [insertTodo, { loading, error }] = useMutation(
    ADD_TO_JOURNAL_CLEAN_BALANCE
  );

  useEffect(() => {
    console.log("Add to Journal clean data");
    insertTodo({
      variables: {
        balance: newBalance,
        total: props.total + 1,
        average: newAverage
      }
    });
  }, ["oneTime"]);

  return (
    <div>
      <Delete />
    </div>
  );
}

const ADD_TO_JOURNAL_CLEAN_BALANCE = gql`
  mutation($balance: Int = "", $total: Int = "", $average: Int = "") {
    insert_JournalCleanData_one(
      object: { average: $average, balance: $balance, total: $total }
    ) {
      average
      balance
      total
    }
  }
`;
