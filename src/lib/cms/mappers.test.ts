import { defaultHomePageView, mapMedia } from "@/src/lib/cms/mappers";

describe("mapMedia", () => {
  it("maps valid media objects", () => {
    const media = mapMedia({
      url: "/media/sample.jpg",
      alt: "Sample",
      mimeType: "image/jpeg",
    });

    expect(media).toEqual({
      url: "/media/sample.jpg",
      alt: "Sample",
      mimeType: "image/jpeg",
    });
  });

  it("returns undefined for invalid media objects", () => {
    expect(mapMedia(null)).toBeUndefined();
    expect(mapMedia({ alt: "No url" })).toBeUndefined();
  });
});

describe("defaultHomePageView", () => {
  it("returns expected baseline content", () => {
    const view = defaultHomePageView();
    expect(view.navItems.length).toBeGreaterThan(0);
    expect(view.hero.headline).toContain("timeless memories");
  });
});
