import { useAppDrawer } from "../hooks/useAppDrawer";
import { AppDrawer } from "./AppDrawer";
import { useEffect } from "react";
import { Button } from "./Button";

type ReleaseNotesDrawerProps = {
  snapHeightPercent: number;
  content: React.ReactNode;
  version: string;
};

export const ReleaseNotesDrawer = ({
  snapHeightPercent,
  content,
  version,
}: ReleaseNotesDrawerProps) => {
  const appDrawer = useAppDrawer();

  useEffect(() => {
    const lastSeenVersion = localStorage.getItem("lastSeenVersion");

    if (lastSeenVersion !== version) {
      setTimeout(() => {
        appDrawer.open();
        appDrawer.snapTo(snapHeightPercent);
        localStorage.setItem("lastSeenVersion", version);
      }, 500);
    }
  }, [appDrawer, version, snapHeightPercent]);

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
          <Button variant="primary" onClick={() => appDrawer.close()}>
            Got it!
          </Button>
        </div>
      </div>
    </AppDrawer>
  );
};
