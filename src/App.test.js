import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
beforeEach(() => {
  global.fetch = jest.fn(() => new Promise(() => {}));
});
beforeAll(() => {
  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  HTMLDialogElement.prototype.showModal = function () {
    this.open = true;
  };
});
test("default portfolio gives recruiters content and does not load a canvas", () => {
  const { container } = render(<App />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Technical depth.",
  );
  expect(
    screen.getByRole("button", { name: /launch car mode/i }),
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /view résumé/i })).toHaveAttribute(
    "href",
    "/Resume.pdf",
  );
  expect(container.querySelector("canvas")).toBeNull();
});
test("case studies open and close with the actual project content", () => {
  render(<App />);
  fireEvent.click(
    screen.getByRole("button", { name: /Vusion Topstock Operations/i }),
  );
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  expect(screen.getByText(/Deployment scope is 29 stores/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: /close case study/i }));
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});
test("contact form validates required fields and honestly describes email handoff", () => {
  render(<App />);
  expect(screen.getByLabelText("Your name")).toBeRequired();
  expect(screen.getByLabelText("Email address")).toHaveAttribute(
    "type",
    "email",
  );
  expect(screen.getByLabelText("What are you working on?")).toBeRequired();
  expect(screen.getByRole("status")).toHaveTextContent("Opens your email app");
});

test("Causey is the flagship and GitHub shows the full annual contribution total", async () => {
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      login: "Admft",
      commits: 219,
      total: 1013,
      periodStart: "2025-09-20",
      periodEnd: "2026-09-19",
      updatedAt: "2026-09-19T12:00:00Z",
      contributions: [{ date: "2025-09-20", count: 3, level: 2 }],
    }),
  });
  const { container } = render(<App />);
  expect(container.querySelector(".project-featured")).toHaveTextContent(
    "Causey",
  );
  expect(container.querySelector(".project-card")).toHaveTextContent("Causey");
  expect(await screen.findByText("1,013")).toBeInTheDocument();
  expect(screen.queryByText("219")).not.toBeInTheDocument();
  expect(screen.queryByText("verified commits")).not.toBeInTheDocument();
  expect(
    screen.getByText("contributions in the last year"),
  ).toBeInTheDocument();
});
test("GitHub request failure leaves a profile link instead of a fake zero", async () => {
  global.fetch.mockRejectedValue(new Error("Offline"));
  render(<App />);
  expect(
    await screen.findByText("GitHub activity is temporarily unavailable."),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: "View GitHub profile" }),
  ).toHaveAttribute("href", "https://github.com/Admft");
});
