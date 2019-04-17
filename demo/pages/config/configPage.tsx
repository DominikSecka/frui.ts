import { useDisposable } from "@src/helpers/reactHelpers";
import * as React from "react";
import ConfigView from "./configView";
import ConfigViewModel from "./configViewModel";

const ConfigPage: React.FunctionComponent = () => {
    const viewModel = new ConfigViewModel();
    useDisposable(viewModel);

    return <ConfigView vm={viewModel} />;
};

export default ConfigPage;
