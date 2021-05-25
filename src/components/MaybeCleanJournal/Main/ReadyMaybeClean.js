import React from "react";
import { Link } from "react-router-dom";

export default function ReadyMaybeClean(props) {
    return (
      <div class="flex justify-center items-center bg-green-50 py-16">
          <div class="w-2/3">
          <div class="flex flex-col space-y-6">
          <h1 class="text-4xl font-black">Situation</h1>
          <p class="text-4xl">{props.situation}</p>
          <h1 class="text-4xl font-black">Reframe</h1>
          <p class="text-4xl">{props.reframe}</p>
          <Link to={`/notclean/${props.id}`}>
            <button class="w-full bg-red-50 hover:bg-red-100 text-black font-bold py-2 px-4 rounded">Not clean</button>
          </Link>   
          <Link to={`/delete/${props.id}/${props.count}`}>
            <button class="w-full bg-blue-50 hover:bg-blue-100 text-black font-bold py-2 px-4 rounded">Completely clean</button>
          </Link>
          <Link to={`/`}>
            <button class="w-full bg-yellow-50 hover:bg-yellow-100 text-black font-bold py-2 px-4 rounded">Go Back</button>
          </Link>       
          </div>
          </div>
        </div>
    )
  }
  