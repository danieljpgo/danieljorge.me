import Link from "next/link";
import { Heading, Text } from "~/components";

export default function Notes() {
  return (
    <div>
      <Heading
        as="h2"
        size="2xl"
        weight="semibold"
        leading="tight"
        color="darker"
      >
        Notes
      </Heading>
      <div className="mt-2">
        <Text color="base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
          recusandae lorem abc.
        </Text>
      </div>
      <hr className="mt-4 py-4" />
      <ul className="grid gap-4">
        <li>
          <article className="grid gap-4">
            <div className="grid gap-1">
              <Link href="/notes/slug">
                <Heading
                  as="h3"
                  size="base"
                  weight="medium"
                  leading="tight"
                  color="darker"
                >
                  Lorem ipsum dolor dolor dolor
                </Heading>
              </Link>
              <Text size="sm" color="light">
                January 2, 2022
              </Text>
              <div className="mt-2">
                <Text color="base">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </Text>
              </div>
            </div>
          </article>
          <hr className="mt-4 py-2" />
        </li>
        <li>
          <article className="grid gap-4">
            <div className="grid gap-1">
              <Link href="/notes/slug">
                <Heading
                  as="h3"
                  size="base"
                  weight="medium"
                  leading="tight"
                  color="darker"
                >
                  Lorem ipsum dolor
                </Heading>
              </Link>
              <Text size="sm" color="light">
                January 2, 2022
              </Text>
              <div className="mt-2">
                <Text color="base">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </Text>
              </div>
            </div>
          </article>
          {/* <hr className="mt-4 py-2" /> */}
        </li>
      </ul>
    </div>
  );
}
