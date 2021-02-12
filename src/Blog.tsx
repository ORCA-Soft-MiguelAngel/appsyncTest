import * as React from "react";
import { graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import { listBlogs } from "./graphql/queries";
import { GraphQLResult } from "@aws-amplify/api-graphql";

//APPSYNC SUBSCRIPTION
import { API } from "aws-amplify";
import { onCreateBlog } from "./graphql/subscriptions";
import Observable from "zen-observable-ts";
import { ListBlogs } from "./@types/blogtypes";

export const Blogs = () => {
  //State
  const [blogs, setBlogs] = React.useState<any[] | undefined>();

  //Effects
  React.useEffect(() => {
    fetchBlogs();

    suscribe();
  }, []);

  //fetch blogs
  const fetchBlogs = async () => {
    try {
      const blogsData: any | undefined = await API.graphql(
        graphqlOperation(listBlogs)
      );
      setBlogs((await blogsData).data?.listBlogs.items);
    } catch (error) {
      console.log("error fetching actors");
    }
  };

  //subscripcion a la cual te apuntas
  function suscribe() {
    const what: Observable<object> = API.graphql({
      query: onCreateBlog,
    }) as Observable<object>;

    what.subscribe({
      next: (data: any) => {
        //setBlogs(b);
        fetchBlogs();
      },
    });
  }

  return (
    <React.Fragment>
      {blogs ? (
        <div>
          <div>
            {blogs.map((b: any) => (
              <div key={b.id}>{b.name}</div>
            ))}
          </div>
        </div>
      ) : (
        <div>Cargando datos...</div>
      )}
    </React.Fragment>
  );
};
