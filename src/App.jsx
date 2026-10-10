import { useEffect, useState } from "react";
import styled from "styled-components";
import api from "./api";
import Header from "./Components/Header";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Components/Footer";

const Card = styled.div`
  display: flex;
  width: 90%;
  height: 550px;
  /* background: #235b75; */
  background: #1d4c62;
  /* background: #173d4f; */

  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 20px;
  border-radius: 15px;
  padding-top: 10px;

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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;

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
  margin-left: 45px;

  @media screen and (max-width: 750px) {
    margin-left: 10px;
  }
`;

function App() {
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  async function GetPosts() {
    try {
      const { data } = await api.get("/get-posts");

      if (!data) {
        return alert("Erro, posts não encontrados!!");
      }

      setPosts(data);

      return data;
    } catch (error) {
      return alert(error);
    }
  }

  function goToProfile(id) {
    localStorage.setItem("ID", id);

    navigate("/profile");
  }

  useEffect(() => {
    GetPosts();
  }, []);

  return (
    <>
      <Header />
      <ContainerGeral>
        <h1 style={{ color: "lightgray" }}>BLOG SOBRE BATERIA</h1>
        <BodyContainer>
          <ContainerCards>
            {posts.map((items) => {
              return (
                <buttom
                  style={{ cursor: "pointer" }}
                  onClick={() => goToProfile(items.id)}
                >
                  <Card>
                    <img
                      src={items.image}
                      style={{ borderRadius: "15px" }}
                      width="250"
                      height="200"
                    />
                    <h2 style={{ fontSize: "27px", color: "#c3c6c7" }}>
                      {items.title}
                    </h2>
                    <p
                      style={{
                        width: "80%",
                        color: "#e1e4e6",
                        textIndent: "18px",
                        textAlign: "justify",
                      }}
                    >
                      {items.description}
                    </p>

                    {/* <p style={{ width: "80%", color: "#e6e7e8" }}>
                    {items.description}
                    </p> */}
                  </Card>
                </buttom>
              );
            })}
          </ContainerCards>
        </BodyContainer>
      </ContainerGeral>
      <Footer />
    </>
  );
}

export default App;
