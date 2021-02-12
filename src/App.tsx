import Amplify from "@aws-amplify/core";
import { graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import React from "react";
import "./App.css";
import config from "./aws-exports";
import { Blogs } from "./Blog";
import Form from "./Form";
import { createBlog } from "./graphql/mutations";


Amplify.configure(config);

const App = () => {


  return (
    <div style={{ textAlign: "center" }}>
      <Connect mutation={graphqlOperation(createBlog)}>
        {({ mutation }: any) => (
          <Form
            onSubmit={async (input) => {
              const response = await mutation({
                input,
              });
            }}
          />
        )}
      </Connect>
      <Blogs />
    </div>
  );
};

export default App;
