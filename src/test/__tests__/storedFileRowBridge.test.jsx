// @ts-nocheck
import { act, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";

import StoredFiles from "@/components/StoredFiles";
import { TituloOffProvider } from "@/hooks/useTituloOff";

/**
 * Minimal parent that mirrors Landing.jsx's commit contract: onDelete is the
 * actual removal from state (functional update, so two exit commits landing
 * in the same tick chain instead of resurrecting a row). `api` is a mutable
 * escape hatch so tests can add files after mount.
 */
function Harness({ initialFiles, commitLog, api }) {
  const [files, setFiles] = useState(initialFiles);

  api.add = (fileName, content) =>
    setFiles((prev) => ({ ...prev, [fileName]: content }));

  const handleDelete = (fileName) => {
    commitLog.push(fileName);
    setFiles((prev) => {
      const next = { ...prev };
      delete next[fileName];
      return next;
    });
  };

  return (
    <TituloOffProvider>
      <StoredFiles files={files} onSelect={() => {}} onDelete={handleDelete} />
    </TituloOffProvider>
  );
}

describe("Stored-file row enter/exit bridge (T7)", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("boots class-free, exits with file-row-exit before committing, and animates only rows added later", () => {
    const commitLog = [];
    const api = {};
    render(
      <Harness
        initialFiles={{ "uno.json": { q: 1 }, "dos.json": { q: 2 } }}
        commitLog={commitLog}
        api={api}
      />,
    );

    // Frequency gate: rows present at mount (page refresh) never animate.
    expect(screen.getByText("uno")).toBeInTheDocument();
    expect(screen.getByText("dos")).toBeInTheDocument();
    expect(document.querySelector(".file-row-enter")).toBeNull();

    // A delete click only starts the exit — the commit is deferred.
    fireEvent.click(screen.getAllByText("Eliminar")[0]);

    const exiting = document.querySelector(".file-row-exit");
    expect(exiting).not.toBeNull();
    expect(exiting).toHaveTextContent("uno");
    // The exit class lives on the inner wrapper, NOT on the sortable root
    // (the root carries dnd-kit's inline transform and must stay untouched).
    expect(exiting.parentElement.className).toContain("border-b");
    expect(exiting.parentElement.className).not.toContain("file-row-exit");
    // Nothing committed to the parent yet.
    expect(commitLog).toEqual([]);

    // jsdom never fires animationend, so the hook's durationMs fallback is
    // the commit path: after it elapses the row is gone, its sibling stays.
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(screen.queryByText("uno")).toBeNull();
    expect(document.querySelector(".file-row-exit")).toBeNull();
    expect(commitLog).toEqual(["uno.json"]);
    expect(screen.getByText("dos")).toBeInTheDocument();

    // Positive half of the gate: a row added after boot mounts with the
    // enter class on its inner wrapper.
    act(() => {
      api.add("tres.json", { q: 3 });
    });
    const entering = document.querySelector(".file-row-enter");
    expect(entering).not.toBeNull();
    expect(entering).toHaveTextContent("tres");
    expect(screen.getByText("dos").closest(".file-row-enter")).toBeNull();
  });

  it("commits a rapid double-delete independently without resurrecting either row", () => {
    const commitLog = [];
    const api = {};
    render(
      <Harness
        initialFiles={{ "uno.json": { q: 1 }, "dos.json": { q: 2 } }}
        commitLog={commitLog}
        api={api}
      />,
    );

    fireEvent.click(screen.getAllByText("Eliminar")[0]);
    fireEvent.click(screen.getAllByText("Eliminar")[1]);

    // Both rows exit concurrently — the list never blocks on the first one.
    expect(document.querySelectorAll(".file-row-exit").length).toBe(2);
    expect(commitLog).toEqual([]);

    // One timer sweep fires both fallbacks in the same tick; the chained
    // commit must remove BOTH, not resurrect one via a stale snapshot.
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(commitLog).toEqual(["uno.json", "dos.json"]);
    expect(screen.queryByText("uno")).toBeNull();
    expect(screen.queryByText("dos")).toBeNull();
    expect(
      screen.getByText("No hay cuestionarios almacenados."),
    ).toBeInTheDocument();
  });
});
