import { useRegisterSW } from "virtual:pwa-register/react";
import { IconX, IconRefresh, IconBell } from "./icons";
import type { RegisterSWOptions } from "virtual:pwa-register/react";

const options: RegisterSWOptions = {
  onRegistered(r) {
    console.log("SW registered: ", r);
  },
  onRegisterError(err) {
    console.warn("SW registration error", err);
  },
};

export default function PWAToast() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW(options);

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };
  const show = offlineReady || needRefresh;

  if (!show) {
    return null;
  }

  return (
    <div className="toast" role="alert" aria-live="assertive" aria-atomic>
      <strong className="toast-title">
        <IconBell height="1em" width="1.25em" />{" "}
        {needRefresh ? "New Version" : "Offline Ready"}
      </strong>
      <p className="toast-msg">
        {offlineReady
          ? "App ready to work offline"
          : "New content available, click on reload button to update."}
      </p>
      <div className="toast-footer">
        {needRefresh && (
          <button
            type="button"
            className="btn btn-shine"
            onClick={() => {
              updateServiceWorker(true);
            }}
          >
            <IconRefresh height="1em" width="1.25em" /> Reload
          </button>
        )}
        <button
          type="button"
          className="btn btn-shine"
          title="close"
          onClick={() => {
            close();
          }}
        >
          <IconX height="1em" width="1.25em" /> Close
        </button>
      </div>
    </div>
  );
}
