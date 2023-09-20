import Head from "next/head";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import styles from "@/styles/Home.module.css";
import AppSection from "@/components/AppSection";
import { AppWithDevelopersProps } from "../components/types";
import axios from "axios";

export default function Home() {
  const [webAppsRandom, setWebAppsRandom] = useState<AppWithDevelopersProps[]>(
    []
  );
  const [mobileAppsRandom, setMobileAppsRandom] = useState<
    AppWithDevelopersProps[]
  >([]);
  const [nativeAppsRandom, setNativeAppsRandom] = useState<
    AppWithDevelopersProps[]
  >([]);

  const APP_URL = "/api/appRoutes";

  const getRandomApps = (appsList: any, maxApps: number) => {
    if (appsList.length <= maxApps) return appsList;

    const shuffled = appsList.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, maxApps);
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const res = await axios.get(APP_URL);
      const allApps: AppWithDevelopersProps[] = res.data.apps;

      if (allApps.length > 0) {
        const webApps = allApps.filter((app) => app.type === "Web");
        const mobileApps = allApps.filter((app) => app.type === "Mobile");
        const nativeApps = allApps.filter((app) => app.type === "Native");

        let webAppsList;
        let mobileAppsList;
        let nativeAppsList;

        // Checking the screen size based on window.innerWidth
        if (window.innerWidth <= 500) {
          webAppsList = getRandomApps(webApps, 1);
          mobileAppsList = getRandomApps(mobileApps, 1);
          nativeAppsList = getRandomApps(nativeApps, 1);
        } else if (window.innerWidth <= 900) {
          webAppsList = getRandomApps(webApps, 3);
          mobileAppsList = getRandomApps(mobileApps, 3);
          nativeAppsList = getRandomApps(nativeApps, 3);
        } else if (window.innerWidth <= 1200) {
          webAppsList = getRandomApps(webApps, 4);
          mobileAppsList = getRandomApps(mobileApps, 4);
          nativeAppsList = getRandomApps(nativeApps, 4);
        } else {
          webAppsList = getRandomApps(webApps, 5);
          mobileAppsList = getRandomApps(mobileApps, 5);
          nativeAppsList = getRandomApps(nativeApps, 5);
        }

        setWebAppsRandom(webAppsList);
        setMobileAppsRandom(mobileAppsList);
        setNativeAppsRandom(nativeAppsList);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // An event listener to recheck screen size when the window is resized
  useEffect(() => {
    fetchData();

    // Add an event listener to recheck screen size when the window is resized
    window.addEventListener("resize", fetchData);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", fetchData);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Adies Capstones Hub</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="shortcut icon"
          href="/favicon.ico"
          type="images/AdieLogo-browser.png"
        ></link>
        <link
          rel="icon"
          href="/favicon.ico"
          type="images/AdieLogo-browser.png"
        />
        {/* Head content */}
      </Head>
      <main className={styles.main}>
        <Navbar />
        <section className={styles.appsWrapper}>
          <AppSection
            sectionTitle="Web apps"
            apps={webAppsRandom}
            seeAllLink="/web-apps"
          />
          <AppSection
            sectionTitle="Mobile apps"
            apps={mobileAppsRandom}
            seeAllLink="/mobile-apps"
          />
          <AppSection
            sectionTitle="Native apps"
            apps={nativeAppsRandom}
            seeAllLink="/native-apps"
          />
        </section>
      </main>
    </>
  );
}
