import { test, expect } from "@playwright/test";
test("loads a working design studio", async ({page}) => {
 await page.goto("/");
 await expect(page.getByRole("heading",{name:/websites.*pulse/i})).toBeVisible();
 await expect(page.getByText("FORM/LAB",{exact:false}).first()).toBeVisible();
 await expect(page.getByText("BRIEF COMPILER")).toBeVisible();
 await expect(page.locator(".experiment-stage")).toBeVisible();
});
test("compiles a project brief and persists it locally",async({page})=>{
 await page.goto("/#workbench");
 await page.getByLabel(/Project name/).fill("Living Archive");
 await page.getByLabel(/Tell us about the idea/).fill("An experimental editorial portfolio.");
 await page.getByRole("button",{name:/RECONSTRUCT REFERENCE/}).click();
 await page.getByLabel("Reference website URL").fill("https://example.com");
 await page.getByRole("button",{name:/COMPILE DESIGN BRIEF/}).click();
 await expect(page.getByText("YOUR SPECIFICATION IS READY")).toBeVisible();
 await expect(page.getByRole("heading",{name:"Living Archive"})).toBeVisible();
 await page.reload();
 await page.getByRole("button",{name:/SAVED BRIEFS/}).click();
 await expect(page.getByText("Living Archive")).toBeVisible();
});
test("navigation and primary call to action work",async({page})=>{
 await page.goto("/");
 await page.getByRole("link",{name:/OPEN THE STUDIO/}).click();
 await expect(page).toHaveURL(/\/build-room$/);
 await expect(page.getByRole("textbox",{name:"Describe your website"})).toBeVisible();
});

test("reverse engineered workspace creates and edits a real sandboxed preview",async({page})=>{
 await page.goto("/build-room");
 await page.getByRole("textbox",{name:"Describe your website"}).fill("Create a portfolio called Sonder Studio");
 await page.getByRole("button",{name:"Generate or modify prototype"}).click();
 await expect(page.locator('iframe[title="Sandboxed website preview"]')).toBeVisible();
 await expect(page.getByText("PREVIEW READY")).toBeVisible();
 await page.getByRole("textbox",{name:"Describe your website"}).fill("Make it dark and change the accent to blue");
 await page.getByRole("button",{name:"Generate or modify prototype"}).click();
 await page.locator(".bw-tabs").getByRole("button",{name:"Code",exact:true}).click();
 await expect(page.getByRole("textbox",{name:"Edit generated HTML"})).toHaveValue(/#608fc4/);
 await page.locator(".bw-tabs").getByRole("button",{name:"Activity",exact:true}).click();
 await expect(page.getByText("Design updated")).toBeVisible();
 await page.reload();
 await page.locator(".bw-tabs").getByRole("button",{name:"Code",exact:true}).click();
 await expect(page.getByRole("textbox",{name:"Edit generated HTML"})).toHaveValue(/Sonder Studio/);
});
