import { useBottomSheet } from "@plainsheet/react";

export const useAppDrawer = () => {
  const appDrawer = useBottomSheet({
    //Only include props that are logic and not style related, as the styles are defined in the AppDrawer component.
    shouldShowHandle: false,
  });
  return appDrawer;
};
