import React, { useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import CheckIfRewardEarned from "../Reward/CheckIfRewardEarned";
//This function recieves the pageId
//Using that data it runs a mutation to delete all
//of the Journal text
export default function RunReset() {
  const [insertTodo, { loading, error }] = useMutation(INSERT_TODO);

  useEffect(() => {
    console.log("incomplete");
    insertTodo({});
  }, ["runOnce"]);

  return (
    <div>
      <CheckIfRewardEarned />
    </div>
  );
}

//GraphQL query to delete specific Journal by "id"
export const INSERT_TODO = gql`
  mutation($id: Int = "") {
    update_rates(
      _set: { status: "incomplete" }
      where: { status: { _eq: "cleaned" } }
    ) {
      affected_rows
    }
  }
`;
