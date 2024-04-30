import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

/**
 * Do not edit this. Add your work in `pages/listings.tsx`.
 */
export default function App() {
  return (
    <main>
      <Head>
        <title>Side React Take-home Assignment</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{
          maxWidth: "70%",
          padding: "1em",
          marginLeft: "auto",
          marginRight: "auto",
          background: "#eee",
        }}
      >
        <h1>Side React Take-home Assignment</h1>
        <p>
          Welcome to the Side React take-home assignment. This boilerplate is
          intended to help get you started. It's already setup with the fonts
          and SVG assets you will need to complete your assignment.
        </p>
        <p>
          <em>
            Be sure to read through the INSTRUCTIONS.md content before
            beginning. Good luck!
          </em>
        </p>
        <div>
          <div>Here are the SVG assets you will need.</div>
          <Image
            src="/heart-fill.svg"
            className="App-logo"
            alt="favorite icon"
            width="24"
            height="24"
          />
          <Image
            src="/heart-stroke.svg"
            className="App-logo"
            alt="unfavorite ico"
            width="24"
            height="24"
          />
        </div>
        <p>
          <Link href="/listings">
            <b>Start building on the Listings page →</b>
          </Link>
        </p>
      </div>
    </main>
  );
}
