import Link from "next/link";
import { topics } from "~/lib/content";

type TopicsLayoutProps = {
  children: React.ReactNode;
};

export default function TopicsLayout({ children }: TopicsLayoutProps) {
  return (
    <div>
      <ul>
        {(Object.keys(topics) as Array<keyof typeof topics>).map((topic) => (
          <li key={topic}>
            <Link href={`/topics/${topic}`}>{topics[topic]}</Link>
          </li>
        ))}
      </ul>
      <div>{children}</div>
    </div>
  );
}
