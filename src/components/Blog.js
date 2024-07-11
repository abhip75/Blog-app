import React, { useState, useEffect } from "react";
import { GraphQLClient, gql } from "graphql-request";
import NavBar from "./NavBar";
import "../App.css";


const token = process.env.REACT_APP_TOKEN;

const graphcms = new GraphQLClient(
  "https://ap-south-1.cdn.hygraph.com/content/clyfzao4h018r07uln03or6as/master",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

const QUERY = gql`
  {
    posts {
      id
      title
      datePublished
      slug
      content {
        html
      }
      author {
        name
        avatar {
          url
        }
      }
      coverPhoto {
        url
      }
    }
  }
`;

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { posts } = await graphcms.request(QUERY);
        setPosts(posts);
      } catch (error) {
        setError(error);
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  if (error) {
    return <div className="container">Error fetching posts: {error.message}</div>;
  }

  return (
    <>
        <NavBar/>
        <div className="container mt-4">
            <div className="row">
                    {posts.map((post) => (
                    <div key={post.id} className="col-md-4 mb-4">
                        <div className="card shadow-lg">
                        {post.coverPhoto && post.coverPhoto.url ? (
                            <img src={post.coverPhoto.url} className="card-img-top" alt="Cover" />
                        ) : (
                            <div className="card-img-top bg-secondary"></div>
                        )}
                        <div className="card-body">
                            <h5 className="card-title">{post.title}</h5>
                            <div className="card-info" dangerouslySetInnerHTML={{ __html: post.content.html }} />
                            <div className="author d-flex align-items-center">
                            {post.author.avatar && post.author.avatar.url ? (
                                <img
                                src={post.author.avatar.url}
                                alt={post.author.name}
                                className="rounded-circle me-2 avatar"
                                width="50"
                                height="50"
                                />
                            ) : (
                                <div></div>
                            )}
                            <p className="mb-0"><strong>{post.author.name}</strong></p>
                            <p className="card-text ms-auto"><span className="badge bg-dark">{post.datePublished}</span></p>
                            </div>
                        </div>
                        </div>
                    </div>
                    ))}
            </div>
        </div>

    </>
   

  );
};

export default Blog;
