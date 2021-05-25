import React, { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";

export const INSERT_TODO = gql`
  mutation MyMutation($Amount: numeric, $Balance: numeric, $Reason: String) {
    insert_GoHenry_one(
      object: { Balance: $Balance, Amount: $Amount, Reason: $Reason }
    ) {
      Amount
      Balance
      Date
    }
  }
`;

export default function AddReward(props) {
  const [count, setCount] = useState(0);
  const [insertTodo, { loading, error }] = useMutation(INSERT_TODO);

  useEffect(() => {
    console.log("Hello World");
    insertTodo({
      variables: {
        Amount: 0.25,
        Balance: 0.25 + props.balance,
        Reason: "Reframe"
      }
    });
  }, [count]);

  return (
    <div class="h-screen flex justify-center items-center bg-green-50">
    <div class="grid grid-rows-2 gap-20 w-2/3">
      <div class="flex justify-center items-center">
      <h1 class="text-9xl">Reward Added</h1>
      </div>
      <div class="grid grid-cols-3 h-60">
            <div class="bg-blue-50 flex justify-center items-center">
              <div class="grid grid-rows-2"> 
                <p class="text-3xl">?</p>
                <p class="text-5xl flex justify-center">?</p>
              </div>
            </div>
            <div class="bg-red-50 flex justify-center items-center">
              <div class="grid grid-rows-2"> 
                <p class="text-3xl">?</p>
                <p class="text-5xl flex justify-center">?</p>
              </div>
            </div>
            <div class="bg-yellow-50 flex justify-center items-center">
            <div class="grid grid-rows-2"> 
              <p class="text-3xl">?</p>
              <p class="text-5xl flex justify-center">?</p>
            </div>
            </div>
          </div>
          </div>
    </div>
  );
}
