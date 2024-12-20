import Invoice from "@/views/invoice/Invoice";

export function generateMetadata({ params }, parent) {
  return {
    title: params.id[0],
  };
}

export default function Page({ params }) {
  return <Invoice params={params} />;
}
