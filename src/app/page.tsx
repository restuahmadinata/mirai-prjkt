import Layout from "@/components/main-layout";

export default function Home() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold">hello there</h1>
      <p>this is my homepage</p>
      <br />
      <p>and here's my wife 👇</p>
      <img src="https://safebooru.org//images/2560/ad4ecf37871f158ccb308823a78f40c26c13b908.png?5207623" alt="Istri gwe" className="border-2 border-pink-100 rounded-sm"/>
    </Layout>
  );
}
