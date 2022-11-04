import Head from "next/head";
import toast, { Toaster } from "react-hot-toast";
import { LogSnag } from "logsnag";
import axios from "axios";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [year, setYear] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function fetchDetails(e: any) {
    e.preventDefault();
    try {
      if (!email || !website) {
        toast.error("Please enter email and website");
        return;
      }
      setIsLoading(true);
      if (process.env.NODE_ENV !== "development") {
        const logsnag = new LogSnag({
          token: "f172620413f0fd2765f4ccdea5b3f38c",
          project: "all-projects",
        });
        await logsnag.publish({
          channel: "website-age",
          event: `Website Age Search: ${website}`,
          description: `Email: ${email}`,
          icon: "🥳",
          notify: true,
        });
      }
      const res = await axios({
        method: "POST",
        url: "/api/fetchWebsiteAge",
        data: {
          website,
        },
      });
      console.log(res.data);
      setYear(res.data);
    } catch (error) {
      // @ts-ignore
      console.log("error at fetchDetails", error.message);
      // @ts-ignore
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Check Age of Website</title>
        <meta name="description" content="Check when a website was created" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Toaster />
      <main>
        {/* Hero section */}
        <div className="relative">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
              <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block text-indigo-600">
                  When was this website created?
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-center text-xl text-black sm:max-w-3xl">
                Find out when a website was created
              </p>
              <div className="mx-auto mt-10 max-w-sm sm:max-w-none sm:justify-center">
                <form onSubmit={fetchDetails}>
                  <div className="mb-4 w-full">
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm w-full"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div className="mb-4 w-full block">
                    <label htmlFor="website" className="sr-only">
                      Website
                    </label>
                    <input
                      type="text"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      name="website"
                      id="website"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="https://www.google.com/"
                    />
                  </div>
                  <div className="block w-full">
                    <button
                      type="submit"
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm sm:px-8 hover:bg-indigo-400 ease-in-out duration-300 w-full"
                    >
                      {isLoading ? "Loading..." : "Submit"}
                    </button>
                  </div>
                </form>
              </div>

              <div className="flex text-center justify-center flex-col">
                <span className="text-8xl mt-8 font-bold">{year}</span>
                <p className="text-xs mt-8">
                  Want an API of this? Hit me up on Twitter{" "}
                  <a
                    href="https://twitter.com/adrian_horning_/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    @adrian
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
