import React from "react";
import { useQuery, gql } from "@apollo/client";
import GetMyBalance from "./GetMyBalance";

//This function checks the database to check if
//I have already earnt the reward today
export default function CheckIfRewardEarned() {
  const { loading, error, data } = useQuery(gql`
    {
      GoHenry(
        where: { Reason: { _eq: "Reframe" } }
        limit: 1
        order_by: { Balance: desc }
      ) {
        Date
        Reason
      }
    }
  `);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const dayOfTheWeek = new Date().getDate();
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const currentDateInHasuraFormat = `${currentYear}-${currentMonth}-${dayOfTheWeek}`;
  const fromHasura = Object.values(data)[0][0]
    .Date.split("-")
    .map((x) => parseFloat(x))
    .join("-");

  if (fromHasura === currentDateInHasuraFormat) {
    return (
      <div class="h-screen flex justify-center items-center bg-green-50">
      <div class="grid grid-rows-2 gap-20 w-2/3">
        <div class="flex justify-center items-center">
        <h1 class="text-9xl">Already added</h1>
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
  } else {
    return <GetMyBalance />;
  }
}
