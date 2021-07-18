export default function Home({ scope }: { scope: string | false }) {
  return (
    <main className="page page-home">
      <h1>{scope || "Flix"} Info</h1>
    </main>
  );
}
Home.defaultProps = {
  scope: false
};
