import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddForm from "./AddForm";
import { useMutation, gql } from "@apollo/client";

//This function saves the edited text in Hasura
//It recieves the text to save from props
export default function AddSave(props) {
  const situationSituation = props.my.Situation;
  const reframeReframe = props.my.Reframe;

  console.log(props);

  const [insertTodo, { loading, error }] = useMutation(EDIT_TEXT);

  useEffect(() => {
    insertTodo({
      variables: {
        situation: situationSituation,
        reframe: reframeReframe
      }
    });
  }, ["oneTime"]);

  return (
    <div>
    <AddForm />
    </div>
  );
}

//GraphQL query that edits text
export const EDIT_TEXT = gql`
  mutation MyMutation($situation: String = "", $reframe: String = "") {
    insert_rates(
      objects: {
        reframe: $reframe
        situation: $situation
        status: "incomplete"
        cleaned: 0
      }
    ) {
      affected_rows
    }
  }
`;
