import Link from "next/link";

export default function Writing() {
  return (
    <>
      <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
        Blog
      </h1>
      <p className="mt-4 text-gray-700">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga recusandae
        lorem abc.
      </p>
      <hr className="mt-6 py-6" />

      <ul className="grid gap-12">
        <li>
          <article className="grid gap-4">
            <div className="grid gap-2">
              <Link href="/writing/slug">
                <h2 className="max-w-[90%] text-2xl font-bold leading-normal sm:text-3xl md:text-3xl">
                  Lorem ipsum dolor dolor dolor
                </h2>
              </Link>
              <p className="text-sm text-slate-600">January 2, 2022</p>
            </div>
            <p className="text-slate-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <hr />
          </article>
        </li>
        <li>
          <article className="grid gap-4">
            <div className="grid gap-2">
              <Link href="/writing/slug">
                <h2 className="max-w-[90%] text-2xl font-bold leading-normal sm:text-3xl md:text-3xl">
                  Lorem ipsum dolor
                </h2>
              </Link>
              <p className="text-sm text-slate-600">January 2, 2022</p>
            </div>
            <p className="text-slate-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <hr />
          </article>
        </li>
      </ul>
    </>
  );
}
