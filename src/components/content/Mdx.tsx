import { useMDXComponent } from "next-contentlayer/hooks";
import { cn } from "~/lib/tailwindcss";

type MdxProps = {
  code: string;
};

export default function Mdx(props: MdxProps) {
  const { code } = props;
  const MDXContent = useMDXComponent(code);

  return (
    <div className="prose max-w-none">
      <MDXContent
        components={{
          a: ({ className, ...props }) => (
            <a
              className={cn(
                "font-normal text-gray-800 underline decoration-gray-800 underline-offset-2 transition-colors duration-300 hover:text-gray-500 hover:decoration-gray-500 active:text-gray-400 active:decoration-gray-400",
                className,
              )}
              {...props}
            />
          ),
          blockquote: ({ className, ...props }) => (
            <blockquote
              className={cn(
                "mt-6",
                "mb-6",
                "pl-6",
                "border-l",
                "font-normal",
                "italic",
                "text-slate-800",
                "[&>*]:text-slate-600",
                className,
              )}
              {...props}
            />
          ),
          code: ({ className, ...props }) => (
            <code
              className={cn(
                "[&:not(pre>*)]:relative",
                "[&:not(pre>*)]:border",
                "[&:not(pre>*)]:rounded",
                "[&:not(pre>*)]:bg-slate-300",
                "[&:not(pre>*)]:bg-opacity-25",
                "[&:not(pre>*)]:py-[0.2rem]",
                "[&:not(pre>*)]:px-[0.3rem]",
                "[&:not(pre>*)]:font-mono",
                "[&:not(pre>*)]:font-normal",
                "[&:not(pre>*)]:text-sm",
                "[&:not(pre>*)]:text-slate-600",
                className,
              )}
              {...props}
            />
          ),
        }}
      />
    </div>
  );
  // return (
  //   <Component
  //     components={{
  //       h1: ({ className, ...props }) => (
  //         <h1
  //           className={cn(
  //             "mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
  //             className,
  //           )}
  //           {...props}
  //         />
  //       ),
  //       h2: ({ className, ...props }) => (
  //         <h2
  //           className={cn(
  //             "mt-10 scroll-m-20 border-b border-b-slate-200 pb-1 text-3xl font-semibold tracking-tight first:mt-0",
  //             className,
  //           )}
  //           {...props}
  //         />
  //       ),
  //       h3: ({ className, ...props }) => (
  //         <h3
  //           className={cn(
  //             "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
  //             className,
  //           )}
  //           {...props}
  //         />
  //       ),
  //       h4: ({ className, ...props }) => (
  //         <h4
  //           className={cn(
  //             "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
  //             className,
  //           )}
  //           {...props}
  //         />
  //       ),
  //       h5: ({ className, ...props }) => (
  //         <h5
  //           className={cn(
  //             "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
  //             className,
  //           )}
  //           {...props}
  //         />
  //       ),
  //       h6: ({ className, ...props }) => (
  //         <h6
  //           className={cn(
  //             "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
  //             className,
  //           )}
  //           {...props}
  //         />
  //       ),
  // a: ({ className, ...props }) => (
  //   <a
  //     className={cn(
  //       "font-medium text-slate-900 underline underline-offset-4",
  //       className,
  //     )}
  //     {...props}
  //   />
  // ),
  //       p: ({ className, ...props }) => (
  //         <p
  //           className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
  //           {...props}
  //         />
  //       ),
  //       ul: ({ className, ...props }) => (
  //         <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  //       ),
  //       ol: ({ className, ...props }) => (
  //         <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  //       ),
  //       li: ({ className, ...props }) => (
  //         <li className={cn("mt-2", className)} {...props} />
  //       ),
  //       blockquote: ({ className, ...props }) => (
  //         <blockquote
  //           className={cn(
  //             "mt-6 border-l-2 border-slate-300 pl-6 italic text-slate-800 [&>*]:text-slate-600",
  //             className,
  //           )}
  //           {...props}
  //         />
  //       ),
  //       // img: ({
  //       //   className,
  //       //   alt,
  //       //   ...props
  //       // }: React.ImgHTMLAttributes<HTMLImageElement>) => (
  //       //   // eslint-disable-next-line @next/next/no-img-element
  //       //   <img
  //       //     className={cn("rounded-md border border-slate-200", className)}
  //       //     alt={alt}
  //       //     {...props}
  //       //   />
  //       // ),
  //       hr: ({ ...props }) => (
  //         <hr className="my-4 border-slate-200 md:my-8" {...props} />
  //       ),
  //       table: ({
  //         className,
  //         ...props
  //       }: React.HTMLAttributes<HTMLTableElement>) => (
  //         <div className="my-6 w-full overflow-y-auto">
  //           <table className={cn("w-full", className)} {...props} />
  //         </div>
  //       ),
  //       tr: ({
  //         className,
  //         ...props
  //       }: React.HTMLAttributes<HTMLTableRowElement>) => (
  //         <tr
  //           className={cn(
  //             "m-0 border-t border-slate-300 p-0 even:bg-slate-100",
  //             className,
  //           )}
  //           {...props}
  //         />
  //       ),
  //       th: ({ className, ...props }) => (
  //         <th
  //           className={cn(
  //             "border border-slate-200 px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
  //             className,
  //           )}
  //           {...props}
  //         />
  //       ),
  //       td: ({ className, ...props }) => (
  //         <td
  //           className={cn(
  //             "border border-slate-200 px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
  //             className,
  //           )}
  //           {...props}
  //         />
  //       ),
  //       // bleed on mobile
  //       pre: ({ className, ...props }) => (
  //         <pre
  //           className={cn(
  //             "mt-6 mb-4 overflow-x-auto rounded-lg bg-slate-50 py-4",
  //             className,
  //           )}
  //           {...props}
  //         />
  //       ),
  //     }}
  //   />
  // );
}
