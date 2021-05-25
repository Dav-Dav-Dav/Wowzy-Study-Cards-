import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { Link } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  useQuery,
  gql,
  ApolloProvider
} from "@apollo/client";
import { useParams } from "react-router-dom";
import EditSave from "./EditSave";

const client = new ApolloClient({
  uri: "https://currency.hasura.app/v1/graphql",
  cache: new InMemoryCache(),
  headers: {
    "x-hasura-admin-secret": process.env.REACT_APP_HASURA_GRAPHQL_ADMIN_SECRET
  }
});

//This function recieves "pageID" so you can
//get the correct text to edit

//
export default function EditForm() {
  const { reframeId } = useParams();

  return (
    <ApolloProvider client={client}>
      <div>
        <LoadForm match={parseInt(reframeId)} />
      </div>
    </ApolloProvider>
  );
}

//1. This function loads a form
//2. The form is preloaded with text (Reframe + Situation)
//3. The text that is preloaded is specific to {match} (pageID)
//function LoadFormffff({ match }) {

function LoadForm({ match }) {
  
  const [run, setRun] = useState("");
  const [mydata, setMydata] = useState("h");

  const { loading, error, data } = useQuery(EDIT_TEXT, {
    variables: { match }
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  const situationById = Object.values(data)[0].map((x) => x.situation)[0];
  const reframeById = Object.values(data)[0].map((x) => x.reframe)[0];

  if (run === "Go") {
    return <EditSave my={mydata} num={match} />;
  } else {
    return (
      <div class="flex justify-center items-center bg-green-50 py-16">
          <div class="w-2/3">
          <Formik
            initialValues={{
              Situation: situationById,
              Reframe: reframeById
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
    );
  }
}

//This graphQL mutation edits the text (situation + reframe)
const EDIT_TEXT = gql`
  query Search($match: Int) {
    rates(order_by: { id: asc }, where: { id: { _eq: $match } }) {
      id
      situation
      reframe
    }
  }
`;
