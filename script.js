const panels = document.querySelectorAll("[data-panel]");
const navItems = document.querySelectorAll("[data-view]");
const toast = document.getElementById("toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2800);
}

function showView(view) {
  panels.forEach((panel) => {
    const active = panel.dataset.panel === view;
    panel.hidden = !active;
    panel.classList.toggle("is-visible", active);
  });
  navItems.forEach((item) => item.classList.toggle("is-active", item.dataset.view === view));
  if (view !== "home") window.scrollTo({ top: 0, behavior: "smooth" });
}

navItems.forEach((item) => item.addEventListener("click", () => showView(item.dataset.view)));

document.querySelectorAll("[data-git-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.gitAction;
    const syncState = document.getElementById("sync-state");
    const panelSync = document.getElementById("git-panel-sync");
    const panelStatus = document.getElementById("git-panel-status");
    const activityTitle = document.getElementById("activity-title");
    const activityCopy = document.getElementById("activity-copy");
    const repoStatus = document.getElementById("repo-status");

    if (action === "connect") {
      repoStatus.textContent = "Connected";
      button.textContent = "Connected";
      showToast("GitHub connection is ready in this interface.");
      return;
    }

    const label = action === "pull" ? "Pulling changes…" : "Pushing changes…";
    const complete = action === "pull" ? "Pulled just now" : "Pushed just now";
    syncState.textContent = label;
    panelSync.textContent = label;
    panelStatus.textContent = label;
    activityTitle.textContent = label;
    activityCopy.textContent = "Working with the connected repository…";

    setTimeout(() => {
      syncState.textContent = complete;
      panelSync.textContent = complete;
      panelStatus.textContent = "Repository connected";
      activityTitle.textContent = complete;
      activityCopy.textContent = action === "pull" ? "Remote changes are reflected in the site interface." : "Your latest site changes are ready to share.";
      showToast(action === "pull" ? "Pull complete — interface is up to date." : "Push complete — interface is up to date.");
    }, 850);
  });
});

document.querySelectorAll(".toggle").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const enabled = toggle.classList.toggle("is-on");
    toggle.setAttribute("aria-pressed", String(enabled));
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
