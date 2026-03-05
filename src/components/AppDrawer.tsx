import { useAppDrawer } from "../hooks/useAppDrawer";
import { BottomSheet } from "@plainsheet/react";
import styles from "./AppDrawer.module.css";

type AppDrawerProps = {
  drawer: ReturnType<typeof useAppDrawer>;
  children: React.ReactNode;
};

export const AppDrawer = ({ drawer, children }: AppDrawerProps) => {
  return (
    <BottomSheet
      {...drawer.props}
      backdropClass={styles.backdrop}
      containerClass={styles.container}
    >
      {children}
    </BottomSheet>
  );
};
