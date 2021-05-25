import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Ready(props) {
    return (
      <div class="flex justify-center items-center bg-yellow-50 py-16">
        <div class="w-2/3">
        <div class="flex flex-col space-y-6">
        <h1 class="text-4xl font-black">Situation</h1>
        <p class="text-4xl">{props.situation}</p>
        <h1 class="text-4xl font-black">Reframe</h1>
        <p class="text-4xl">{props.reframe}</p>       
        <Link to={`/change/${props.id}`}>
          <button class="w-full bg-green-50 hover:bg-green-100 text-black font-bold py-2 px-4 rounded">Next</button>
        </Link>
        <Link to={`/edit/${props.id}`}>
          <button class="w-full bg-blue-50 hover:bg-blue-100 text-black font-bold py-2 px-4 rounded">Edit</button>
        </Link>
        <Link to={`/addtomaybecleanjournal/${props.id}`}>
        <button class="w-full bg-red-50 hover:bg-red-100 text-black font-bold py-2 px-4 rounded">Maybe Clean</button>
        </Link>
        <Link to={`/`}>
          <button class="w-full bg-green-50 hover:bg-green-100 text-black font-bold py-2 px-4 rounded">Go Back</button>
        </Link>
        </div>
        </div>
      </div>
    )
  }