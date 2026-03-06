import { useAppDrawer } from "../hooks/useAppDrawer";
import { AppDrawer } from "./AppDrawer";
import { useEffect } from "react";

type ReleaseNotesDrawerProps = {
  content: React.ReactNode;
  version: string;
};

export const ReleaseNotesDrawer = ({
  content,
  version,
}: ReleaseNotesDrawerProps) => {
  const appDrawer = useAppDrawer();

  useEffect(() => {
    const lastSeenVersion = localStorage.getItem("lastSeenVersion");

    if (lastSeenVersion !== version) {
      setTimeout(() => {
        appDrawer.open();
        appDrawer.snapTo(0.4);
        localStorage.setItem("lastSeenVersion", version);
      }, 500);
    }
  }, [appDrawer, version]);

  return (
    <AppDrawer drawer={appDrawer}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            flexDirection: "row",
            gap: "1rem",
          }}
        >
          <h2>✨ What's new </h2>
          <h3>v. {version}</h3>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ textAlign: "left", fontSize: "0.95rem" }}>
            {content}
          </div>
          <button onClick={() => appDrawer.close()}>Got it!</button>
        </div>
      </div>
    </AppDrawer>
  );
};
