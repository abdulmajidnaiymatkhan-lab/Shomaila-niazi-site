import ConnectRecap from "./ConnectRecap";
import ConnectHighlights from "./ConnectHighlights";
import ConnectForm from "./ConnectForm";
import ConnectClosing from "./ConnectClosing";

export default function ConnectIndex() {
  return (
    <div>
      <ConnectRecap />
      <ConnectHighlights />
      <ConnectForm />
      <ConnectClosing />
    </div>
  );
}
