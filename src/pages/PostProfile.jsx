import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../Components/Header";
import api from "../api";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { Link, useNavigate } from "react-router-dom";

const Card = styled.div`
  display: flex;
  width: 50%;
  height: 550px;
  /* background: #235b75; */
  background: #1d4c62;
  /* background: #173d4f; */

  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 20px;
  border-radius: 15px;
  padding-top: 60px;
  padding-bottom: 40px;

  @media screen and (max-width: 750px) {
    display: flex;
    /* flex-direction: column; */
    width: 100%;
    height: auto;
    padding-top: 33px;
    padding-bottom: 33px;
  }
`;

const ContainerCards = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 750px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const ContainerGeral = styled.div`
  display: flex;
  width: 100vw;
  height: auto;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 200px;
  padding-top: 25px;
  /* background-image: linear-gradient(to bottom, #404040, gray); */
  /* background-image: linear-gradient(to bottom, #000066, darkblue, #0000b3); */
  background-image: linear-gradient(to bottom, #00004d, #000080);
  /* background-image: linear-gradient(to bottom, #000033, #000080); */

  @media screen and (max-width: 750px) {
    /* display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; */
  }
`;

const BodyContainer = styled.div`
  display: flex;
  width: 85%;
  align-items: center;
  justify-content: center;
  // background: "green",
  /* margin-left: 45px; */

  @media screen and (max-width: 750px) {
    margin-left: 10px;
  }
`;

function PostProfile() {
  const [post, setPost] = useState({});
  const [likes, setLikes] = useState(false);

  const id = localStorage.getItem("ID");

  async function UpdateLikes() {
    try {
      await api.put(`/likes/${id}`);

      // navigate("/profile");

      setLikes(true);

      // window.location.reload();

      return null;
    } catch (error) {
      return alert(error);
    }
  }

  async function GetOnePost() {
    try {
      const { data } = await api.get(`/get-one-post/${id}`);

      if (!data) {
        return alert("Erro, posts não encontrados!!");
      }

      setPost(data);

      return data;
    } catch (error) {
      return alert(error);
    }
  }

  useEffect(() => {
    GetOnePost();
  }, []);

  return (
    <>
      <Header />
      <ContainerGeral>
        <h1 style={{ color: "lightgray" }}>BLOG SOBRE BATERIA E TI</h1>
        <BodyContainer>
          <ContainerCards>
            <Card>
              <img
                src={post.image}
                style={{ borderRadius: "15px" }}
                width="350"
                height="300"
              />
              <h2 style={{ fontSize: "27px", color: "#c3c6c7" }}>
                {post.title}
              </h2>
              <p
                style={{
                  width: "80%",
                  color: "#e1e4e6",
                  textIndent: "18px",
                  textAlign: "justify",
                  fontSize: "19px",
                }}
              >
                {post.text}
              </p>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  height: "auto",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  // background: "blue",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "45%",
                    height: "auto",
                    // alignItems: "flex-end",
                    justifyContent: "center",
                    // background: "green",
                  }}
                >
                  <p
                    style={{
                      color: "white",
                      fontSize: "16px",

                      fontWeight: "bold",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        width: "100px",
                        justifyContent: "center",
                        // background: "yellow",
                        // marginLeft: "-55px",
                        cursor: "pointer",
                      }}
                    >
                      {likes === true ? (
                        <button disabled="true" onClick={() => UpdateLikes()}>
                          <ThumbUpAltIcon />
                          <span
                            style={{
                              marginLeft: "7px",
                              fontSize: "21px",
                            }}
                          >
                            {post.likes}
                          </span>
                        </button>
                      ) : (
                        <button onClick={() => UpdateLikes()}>
                          <ThumbUpAltIcon />
                          <span
                            style={{
                              marginLeft: "7px",
                              fontSize: "21px",
                            }}
                          >
                            {post.likes}
                          </span>
                        </button>
                      )}
                    </div>
                  </p>

                  <p
                    style={{
                      color: "white",
                      fontSize: "16px",
                      // marginTop: "-4px",
                      fontWeight: "bold",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ fontSize: "17px" }}>Views:</span>
                      <span
                        style={{
                          marginLeft: "7px",
                          fontSize: "21px",
                        }}
                      >
                        {post.views}
                      </span>
                    </div>
                  </p>
                </div>
              </div>

              {/* <p style={{ width: "80%", color: "#e6e7e8" }}>
                    {items.description}
                  </p> */}
            </Card>
          </ContainerCards>
        </BodyContainer>
      </ContainerGeral>
    </>
  );
}

export default PostProfile;
