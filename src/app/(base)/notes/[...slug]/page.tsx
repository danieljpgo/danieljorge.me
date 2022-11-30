import { Heading, Text } from "../../../../components";

export default function Note() {
  return (
    <article>
      <div className="flex flex-col space-y-2">
        <Heading
          as="h2"
          size="2xl"
          weight="semibold"
          leading="tight"
          color="darker"
        >
          Lorem ipsum dolor
        </Heading>
        <Text size="sm" color="light">
          January 2, 2022
        </Text>
      </div>
      <hr className="mt-4 py-4" />
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
