import { isActivatable, isDeactivatable } from "@src/lifecycle/helpers";
import { useEffect } from "react";

export default function useScreenLifecycle(vm: any) {
  useEffect(() => {
    if (isActivatable(vm)) {
      vm.activate();
    }

    if (isDeactivatable(vm)) {
      return () => vm.deactivate(false);
    }
  }, []);
}
