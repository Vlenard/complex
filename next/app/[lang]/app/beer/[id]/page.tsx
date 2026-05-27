export default function BeerPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Beer {params.id}</h1>

    </div>
  );
}
