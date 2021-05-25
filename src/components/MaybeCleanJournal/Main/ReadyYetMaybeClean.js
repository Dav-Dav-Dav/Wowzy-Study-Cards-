import React from "react";

export default function ReadyYetMaybeClean(props) {
    return (
      <div class="h-screen flex justify-center items-center bg-purple-100">
      <div class="grid grid-rows-2 gap-20 w-2/3">
        <div class="flex justify-center items-center">
        <h1 class="text-9xl">Maybe Clean</h1>
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
    )
  }


