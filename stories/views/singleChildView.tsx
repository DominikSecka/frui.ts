import View from "@src/views/view";
import { registerView } from "@src/views/viewLocator";
import { observer, Observer } from "mobx-react-lite";
import * as React from "react";
import SingleChildViewModel from "../viewModels/singleChildViewModel";

const singleChildView: React.FunctionComponent<{ vm: SingleChildViewModel }> = observer(({ vm }) => !vm ? null :
  <div>
    Choose view model: &nbsp;
<button onClick={vm.selectChild1}>One</button>
    <button onClick={vm.selectChild2}>Two</button>

    <Observer>{() => <View vm={vm.activeItem} />}</Observer>
  </div>);
registerView(singleChildView, SingleChildViewModel);
export default singleChildView;
