import React, { useEffect, useState } from "react";
import Progress from "../Progress/Progress";

export default function ReadyYet(props) {
    return (
      <div class="h-screen flex justify-center items-center bg-green-50">
      <div class="grid grid-rows-2 gap-20 w-2/3">
        <div class="flex justify-center items-center">
        <h1 class="text-9xl">Ready</h1>
        </div>
        <div class="grid grid-cols-3 h-60">
              <div class="bg-blue-50 flex justify-center items-center">
                <div class="grid grid-rows-2"> 
                  <p class="text-3xl">T. Cleaned</p>
                  <p class="text-5xl flex justify-center">{props.cleaned}</p>
                </div>
              </div>
              <div class="bg-red-50 flex justify-center items-center">
                <div class="grid grid-rows-2"> 
                  <p class="text-3xl">E. Left</p>
                  <p class="text-5xl flex justify-center">?</p>
                </div>
              </div>
              <div class="bg-yellow-50 flex justify-center items-center">
                <Progress />
              </div>
            </div>
            </div>
      </div>
    )
  }


