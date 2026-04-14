import { getHomePageData } from "@/src/lib/cms/homepage";
import * as payloadModule from "@/src/lib/cms/payload";

describe("getHomePageData", () => {
  it("returns fallback model when payload client fails", async () => {
    vi.spyOn(payloadModule, "getPayloadClient").mockRejectedValueOnce(new Error("boom"));

    const data = await getHomePageData();
    expect(data.hero.headline).toContain("timeless memories");
    expect(data.navItems.length).toBeGreaterThan(0);
  });
});
