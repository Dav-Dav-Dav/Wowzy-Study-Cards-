import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Formik, Field, Form } from "formik";
import AddSave from "./AddSave";

const client = new ApolloClient({
  uri: "https://currency.hasura.app/v1/graphql",
  cache: new InMemoryCache(),
  headers: {
    "x-hasura-admin-secret": process.env.REACT_APP_HASURA_GRAPHQL_ADMIN_SECRET
  }
});

export default function AddForm() {
  const [run, setRun] = useState("");
  const [mydata, setMydata] = useState("h");

  if (run === "Go") {
    return (
      <ApolloProvider client={client}>
        <AddSave my={mydata} />
      </ApolloProvider>
    );
  } else {
    return (
      <ApolloProvider client={client}>
        <div class="flex justify-center items-center bg-green-50 py-16">
          <div class="w-2/3">
          <Formik
            initialValues={{
              Situation: "",
              Reframe: ""
            }}
            onSubmit={async (values) => {
              await new Promise((r) => setTimeout(r, 500));
              setMydata(values);
              setRun("Go");
            }}
          >
            <Form class="space-y-6">
              <h1 class="text-5xl flex justify-center">Situation</h1>
              <label htmlFor="Situation"></label>
              <Field
                class="text-5xl w-full"
                name="Situation"
                placeholder=""
                component="textarea"
                rows="15"
              />
              <h1 class="text-5xl flex justify-center">Reframe</h1>
              <label htmlFor="Reframe"></label>
              <Field
                class="text-5xl w-full"
                name="Reframe"
                placeholder=""
                component="textarea"
                rows="15"
              />
              <button class="w-full bg-blue-50 hover:bg-blue-100 text-black font-bold py-2 px-4 rounded" type="submit">Submit</button>
            </Form>
          </Formik>
          <br />
        <Link to={`/`}>
        <button class="w-full bg-red-50 hover:bg-red-100 text-black font-bold py-2 px-4 rounded">Go Back</button>
        </Link>
          </div>
        </div>
      </ApolloProvider>
    );
  }
}
