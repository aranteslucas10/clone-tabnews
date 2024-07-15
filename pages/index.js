import Image from "next/image";

function Home() {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        backgroundColor: "#fff",
        margin: 0,
        padding: 0,
      }}
    >
      <div style={{ padding: "100px" }}>
        <div style={{ fontSize: "24px", color: "#333", marginBottom: "20px" }}>
          &quot;Se você quiser fazer uma torta de maçã a partir do zero, você
          deve primeiro inventar o Universo.&quot;
        </div>
        <div style={{ fontSize: "18px", color: "#777" }}>- Carl Sagan</div>
      </div>
      <Image
        src="./apple-81.gif"
        alt="maçanzinha"
        style={{ maxWidth: "25%", heigth: "auto" }}
      />
    </div>
  );
}

export default Home;
