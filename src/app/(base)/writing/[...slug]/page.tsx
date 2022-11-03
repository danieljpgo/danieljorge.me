// mx-auto max-w-2xl py-12

export default function WritingDetail() {
  return (
    <article>
      <div className="flex flex-col space-y-2">
        <h1 className="max-w-[90%] text-4xl font-bold leading-normal">
          Lorem ipsum dolor
        </h1>
        <p className="text-sm text-slate-600">January 2, 2022</p>
      </div>
      <hr className="my-6" />
      <div className="prose max-w-none">
        Lorem ipsum dolor sit amet.
        <br />
        <br />
        Consectetur adipisicing elit. Animi, sapiente quasi veritatis cum earum
        dolorum suscipit dolore impedit? Saepe dicta omnis dolore. Itaque
        commodi nemo assumenda voluptas quos, error fugit.
        <br />
        <br />
        Fuga dicta repellat voluptatibus dolorum recusandae necessitatibus?
        Numquam excepturi beatae expedita vitae, delectus sequi quo at, officia
        corrupti repellat a.
      </div>
    </article>
  );
}
