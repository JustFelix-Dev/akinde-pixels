import { render, screen } from "@testing-library/react";

import { WelcomeSection } from "@/src/components/site/WelcomeSection";

describe("WelcomeSection", () => {
  it("renders title and body", () => {
    render(<WelcomeSection title="Welcome" body="Photography with emotion." />);

    expect(screen.getByText("Welcome")).toBeInTheDocument();
    expect(screen.getByText("Photography with emotion.")).toBeInTheDocument();
  });
});
